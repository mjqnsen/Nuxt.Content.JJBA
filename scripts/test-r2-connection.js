#!/usr/bin/env node

/**
 * Simple R2 connection test
 */

import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { config } from 'dotenv'

config()

console.log('🔧 Testing R2 Connection...')
console.log(`Account ID: ${process.env.CLOUDFLARE_ACCOUNT_ID}`)
console.log(`Bucket: ${process.env.CLOUDFLARE_R2_BUCKET_NAME}`)
console.log(`Access Key ID: ${process.env.CLOUDFLARE_R2_ACCESS_KEY_ID?.slice(0, 8)}...`)

const r2Client = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION || 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
})

try {
  console.log('📋 Testing bucket access...')
  const command = new ListObjectsV2Command({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    MaxKeys: 1,
  })
  
  const response = await r2Client.send(command)
  console.log('✅ Connection successful!')
  console.log(`📊 Bucket contains ${response.KeyCount || 0} objects`)
  
} catch (error) {
  console.error('❌ Connection failed:', error.message)
  
  if (error.message.includes('Unauthorized')) {
    console.log('\n🔍 Troubleshooting tips:')
    console.log('1. Check your R2 API token permissions')
    console.log('2. Ensure token is scoped to the correct bucket')
    console.log('3. Verify Account ID is correct')
    console.log('4. Try creating a new API token')
  }
}
