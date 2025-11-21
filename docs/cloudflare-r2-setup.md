# Cloudflare R2 Image Storage Setup

This document explains how to set up Cloudflare R2 storage for your news article images, enabling seamless switching between local development and production environments.

## Overview

The setup allows your application to:
- Use local images during development (`/images/news/example.jpg`)
- Automatically serve images from Cloudflare R2 in production
- Maintain the same image paths in your markdown files
- Provide fallback handling for missing images

## Setup Steps

### 1. Create Cloudflare R2 Bucket

1. Log into your Cloudflare dashboard
2. Navigate to R2 Object Storage
3. Create a new bucket (e.g., `jjba-images`)
4. Configure public access:
   - Go to Settings → Custom Domains
   - Add a custom domain (e.g., `images.yourdomain.com`)
   - Or use the default R2.dev domain

### 2. Generate R2 API Credentials

1. In Cloudflare dashboard, go to R2 → Manage R2 API tokens
2. Create a new API token with:
   - Permissions: Object Read & Write
   - Specify your bucket or use all buckets
3. Save the Access Key ID and Secret Access Key

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
# Copy the example file
cp .env.example .env
```

Update `.env` with your R2 configuration:

```env
CLOUDFLARE_R2_BUCKET_NAME=your-bucket-name
CLOUDFLARE_R2_PUBLIC_URL=https://your-public-r2-domain.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your-r2-access-key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-r2-secret-key
CLOUDFLARE_R2_REGION=auto
NODE_ENV=development
```

### 4. Sync Images with R2

Run the sync script to synchronize your local images with R2:

```bash
npm run sync:images
```

This will:
- Upload new images from `./public/images/` to your R2 bucket
- Update changed images (based on file size comparison)
- Delete images from R2 that no longer exist locally
- Maintain the same folder structure
- Show detailed progress and results

You can run this command anytime you add, remove, or update images.

### 5. Update Cloudflare Pages Environment Variables

In your Cloudflare Pages dashboard:
1. Go to Settings → Environment Variables
2. Add the same variables for production:
   - `CLOUDFLARE_R2_BUCKET_NAME`
   - `CLOUDFLARE_R2_PUBLIC_URL`
   - `NODE_ENV=production`

## How It Works

### Development Mode
- `NODE_ENV=development` → Uses local images from `/public/images/`
- Images are served directly by Nuxt dev server
- No R2 requests made

### Production Mode
- `NODE_ENV=production` → Automatically converts paths to R2 URLs
- `/images/news/example.jpg` becomes `https://your-r2-domain.com/images/news/example.jpg`
- Transparent to your markdown files

### Image Composable Usage

The `useImageFallback()` composable automatically handles the conversion:

```javascript
// In your Vue components
const { getImageSrc, handleImageError } = useImageFallback()

// This automatically uses R2 in production, local in development
const imageUrl = getImageSrc('/images/news/example.jpg')
```

### Markdown Image Paths

Keep using the same paths in your markdown files:

```yaml
---
title: "My Article"
gallery:
  - src: "/images/news/example.jpg"  # Same path for dev and prod
    alt: "Example image"
---
```

## Advanced Features

### Image Optimization

For future enhancement, the composable includes `getOptimizedImageSrc()`:

```javascript
// Get resized image (when using Cloudflare Images)
const thumbnailUrl = getOptimizedImageSrc('/images/news/example.jpg', {
  width: 300,
  height: 200,
  fit: 'cover'
})
```

### Server-Side R2 Operations

Use `useR2Storage()` for server-side operations (API routes, etc.):

```javascript
// In server/api/upload.js
const r2 = useR2Storage()
await r2.uploadFile('images/news/new-image.jpg', fileBuffer, 'image/jpeg')
```

## Troubleshooting

### Images Not Loading in Production

1. Verify R2 bucket is publicly accessible
2. Check that `CLOUDFLARE_R2_PUBLIC_URL` is correct
3. Ensure environment variables are set in Cloudflare Pages

### Sync Script Fails

1. Check your R2 credentials in `.env`
2. Verify bucket name is correct
3. Ensure bucket has read/write permissions

### Mixed Content Issues

- Ensure your R2 public URL uses HTTPS
- Custom domains should have SSL certificates

## File Structure

```
├── .env                          # Local environment variables
├── .env.example                  # Environment template
├── composables/
│   ├── useImageFallback.js       # Image handling with R2 support
│   └── useR2Storage.js           # Server-side R2 operations
├── scripts/
│   └── sync-images.js            # Image sync utility
└── public/
    └── images/                   # Local images (dev only)
```

## Cost Considerations

Cloudflare R2 pricing (as of 2024):
- Storage: $0.015/GB/month
- Class A operations: $4.50/million (writes)
- Class B operations: $0.36/million (reads)
- No egress fees

For a typical architecture portfolio site, costs should be minimal (< $1/month).

## Security Notes

- Never commit `.env` files to version control
- Use environment-specific credentials
- Regularly rotate API keys
- Consider using Cloudflare Images for additional optimization and security
