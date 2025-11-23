#!/usr/bin/env node

/**
 * Image sync script for Cloudflare R2
 * Synchronizes local images with R2 storage - upload new/changed images, delete removed ones
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, relative } from 'path'
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { config } from 'dotenv'
import { lookup } from 'mime-types'
import https from 'https'
// Load environment variables
config()

// Create HTTPS agent that handles SSL certificate issues
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL certificate verification for corporate environments
})

const r2Client = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION || 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
  requestHandler: {
    httpsAgent: httpsAgent,
  },
})

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME
const PUBLIC_DIR = './public'
const IMAGES_DIR = join(PUBLIC_DIR, 'images')
const R2_IMAGES_PREFIX = 'images/'

/**
 * Get all image files recursively from a directory
 */
function getLocalImageFiles(dir, baseDir = dir) {
  const files = []
  
  if (!existsSync(dir)) {
    return files
  }
  
  const items = readdirSync(dir)
  
  for (const item of items) {
    const fullPath = join(dir, item)
    const stat = statSync(fullPath)
    
    if (stat.isDirectory()) {
      files.push(...getLocalImageFiles(fullPath, baseDir))
    } else if (stat.isFile()) {
      const ext = fullPath.toLowerCase()
      if (ext.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/)) {
        const relativePath = relative(baseDir, fullPath)
        const r2Key = `${R2_IMAGES_PREFIX}${relativePath.replace(/\\/g, '/')}`
        
        files.push({
          localPath: fullPath,
          r2Key: r2Key,
          relativePath: relativePath.replace(/\\/g, '/'),
          size: stat.size
        })
      }
    }
  }
  
  return files
}

/**
 * Get all images currently in R2 storage
 */
async function getR2ImageFiles() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: R2_IMAGES_PREFIX,
    })
    
    const response = await r2Client.send(command)
    return (response.Contents || []).map(obj => ({
      key: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified
    }))
  } catch (error) {
    console.error('Error listing R2 files:', error.message)
    return []
  }
}

/**
 * Upload a single file to R2
 */
async function uploadFile(localFile) {
  try {
    const fileContent = readFileSync(localFile.localPath)
    const contentType = lookup(localFile.localPath) || 'application/octet-stream'
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: localFile.r2Key,
      Body: fileContent,
      ContentType: contentType,
    })
    
    await r2Client.send(command)
    return true
  } catch (error) {
    console.error(`❌ Failed to upload ${localFile.relativePath}:`, error.message)
    return false
  }
}

/**
 * Delete a file from R2
 */
async function deleteFile(r2Key) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: r2Key,
    })
    
    await r2Client.send(command)
    return true
  } catch (error) {
    console.error(`❌ Failed to delete ${r2Key}:`, error.message)
    return false
  }
}

/**
 * Main sync function
 */
async function syncImages() {
  console.log('� Starting image sync with Cloudflare R2...')
  
  // Check if environment variables are set
  if (!BUCKET_NAME || !process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || !process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY) {
    console.error('❌ Missing required environment variables. Please check your .env file.')
    console.error('Required: CLOUDFLARE_R2_BUCKET_NAME, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY')
    process.exit(1)
  }
  
  // Get local and R2 files
  console.log('📁 Scanning local images...')
  const localFiles = getLocalImageFiles(IMAGES_DIR)
  
  console.log('☁️  Fetching R2 file list...')
  const r2Files = await getR2ImageFiles()
  
  // Create maps for easy lookup
  const localFileMap = new Map(localFiles.map(f => [f.r2Key, f]))
  const r2FileMap = new Map(r2Files.map(f => [f.key, f]))
  
  // Find files to upload (new or changed)
  const filesToUpload = []
  for (const localFile of localFiles) {
    const r2File = r2FileMap.get(localFile.r2Key)
    
    if (!r2File) {
      // New file
      filesToUpload.push({ ...localFile, reason: 'new' })
    } else if (r2File.size !== localFile.size) {
      // Size changed, likely different content
      filesToUpload.push({ ...localFile, reason: 'changed' })
    }
  }
  
  // Find files to delete (exists in R2 but not locally)
  const filesToDelete = []
  for (const r2File of r2Files) {
    if (!localFileMap.has(r2File.key)) {
      filesToDelete.push(r2File.key)
    }
  }
  
  console.log(`\n📊 Sync Analysis:`)
  console.log(`📁 Local images: ${localFiles.length}`)
  console.log(`☁️  R2 images: ${r2Files.length}`)
  console.log(`⬆️  Files to upload: ${filesToUpload.length}`)
  console.log(`🗑️  Files to delete: ${filesToDelete.length}`)
  
  if (filesToUpload.length === 0 && filesToDelete.length === 0) {
    console.log('\n✅ All images are in sync! No changes needed.')
    return
  }
  
  let uploadSuccess = 0
  let uploadFail = 0
  let deleteSuccess = 0
  let deleteFail = 0
  
  // Upload new/changed files
  if (filesToUpload.length > 0) {
    console.log('\n⬆️  Uploading files...')
    for (const file of filesToUpload) {
      const success = await uploadFile(file)
      if (success) {
        console.log(`✅ ${file.reason}: ${file.relativePath}`)
        uploadSuccess++
      } else {
        uploadFail++
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 50))
    }
  }
  
  // Delete removed files
  if (filesToDelete.length > 0) {
    console.log('\n�️  Deleting removed files...')
    for (const r2Key of filesToDelete) {
      const success = await deleteFile(r2Key)
      if (success) {
        console.log(`✅ Deleted: ${r2Key.replace(R2_IMAGES_PREFIX, '')}`)
        deleteSuccess++
      } else {
        deleteFail++
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 50))
    }
  }
  
  // Summary
  console.log('\n📊 Sync Summary:')
  if (filesToUpload.length > 0) {
    console.log(`⬆️  Uploaded: ${uploadSuccess}/${filesToUpload.length}`)
  }
  if (filesToDelete.length > 0) {
    console.log(`�️  Deleted: ${deleteSuccess}/${filesToDelete.length}`)
  }
  
  const totalErrors = uploadFail + deleteFail
  if (totalErrors === 0) {
    console.log('\n🎉 Sync completed successfully!')
    console.log(`🔗 Images available at: ${process.env.CLOUDFLARE_R2_PUBLIC_URL}`)
  } else {
    console.log(`\n⚠️  Sync completed with ${totalErrors} errors. Check messages above.`)
  }
}

// Run sync
syncImages().catch(console.error)
