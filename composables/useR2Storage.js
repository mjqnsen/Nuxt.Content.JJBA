/**
 * Utility functions for interacting with Cloudflare R2 storage
 * This is primarily for development/administration use
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

export class R2Storage {
  constructor() {
    const config = useRuntimeConfig()
    
    this.client = new S3Client({
      region: config.cloudflareR2Region || 'auto',
      endpoint: `https://${config.cloudflareR2BucketName}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.cloudflareR2AccessKeyId,
        secretAccessKey: config.cloudflareR2SecretAccessKey,
      },
    })
    
    this.bucketName = config.cloudflareR2BucketName
    this.publicUrl = config.public.cloudflareR2PublicUrl
  }
  
  /**
   * Upload a file to R2
   * @param {string} key - The key/path in R2 (e.g., 'images/news/example.jpg')
   * @param {Buffer|Uint8Array|string} body - File content
   * @param {string} contentType - MIME type
   * @returns {Promise<string>} Public URL of uploaded file
   */
  async uploadFile(key, body, contentType) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: body,
        ContentType: contentType,
      })
      
      await this.client.send(command)
      return `${this.publicUrl}/${key}`
    } catch (error) {
      console.error('Error uploading to R2:', error)
      throw error
    }
  }
  
  /**
   * Delete a file from R2
   * @param {string} key - The key/path in R2
   * @returns {Promise<boolean>} Success status
   */
  async deleteFile(key) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })
      
      await this.client.send(command)
      return true
    } catch (error) {
      console.error('Error deleting from R2:', error)
      return false
    }
  }
  
  /**
   * List files in R2 with optional prefix
   * @param {string} prefix - Optional prefix to filter by
   * @returns {Promise<Array>} List of file objects
   */
  async listFiles(prefix = '') {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        Prefix: prefix,
      })
      
      const response = await this.client.send(command)
      return response.Contents || []
    } catch (error) {
      console.error('Error listing R2 files:', error)
      throw error
    }
  }
  
  /**
   * Get public URL for a file
   * @param {string} key - The key/path in R2
   * @returns {string} Public URL
   */
  getPublicUrl(key) {
    return `${this.publicUrl}/${key}`
  }
}

/**
 * Composable for R2 operations (server-side only)
 */
export const useR2Storage = () => {
  if (process.client) {
    throw new Error('useR2Storage can only be used on the server side')
  }
  
  return new R2Storage()
}
