# Cloudflare Pages Deployment Setup

This document explains how to set up automatic deployment to Cloudflare Pages using GitHub Actions.

## Prerequisites

1. **Cloudflare Account**: You need a Cloudflare account
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Cloudflare API Token**: Required for automated deployments

## Setup Instructions

### 1. Create Cloudflare API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **My Profile** → **API Tokens**
3. Click **Create Token**
4. Use **Custom token** with these permissions:
   - **Zone:Zone:Read** (for your domain, if using custom domain)
   - **Zone:Page Rules:Edit** (if using custom domain)
   - **Account:Cloudflare Pages:Edit**
5. **Account Resources**: Include your account
6. **Zone Resources**: Include your zone (if using custom domain)
7. Copy the generated token

### 2. Get Cloudflare Account ID

1. In Cloudflare Dashboard, go to the right sidebar
2. Copy your **Account ID**

### 3. Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add these repository secrets:
   - `CLOUDFLARE_API_TOKEN`: Your API token from step 1
   - `CLOUDFLARE_ACCOUNT_ID`: Your account ID from step 2

### 4. Create Cloudflare Pages Project

1. Go to **Cloudflare Dashboard** → **Pages**
2. Click **Create a project**
3. Choose **Direct Upload** (not Git integration, since we're using GitHub Actions)
4. Set project name: `jan-jansen-architectuur`
5. Complete the setup

## Deployment Configuration

### GitHub Actions Workflow

The workflow file `.github/workflows/deploy-cloudflare.yml` is configured to:

- **Trigger**: On pushes to `master` branch and pull requests
- **Build**: Generate static files using `npm run generate`
- **Deploy**: Upload to Cloudflare Pages using the official action

### Build Settings

```yaml
Build command: npm run generate
Build output directory: .output/public
Node.js version: 18
```

### Environment Variables (Optional)

If you need environment variables in production:

1. Go to **Cloudflare Pages** → **Your Project** → **Settings** → **Environment variables**
2. Add any required variables for production

## Custom Domain Setup (Optional)

### 1. Add Custom Domain

1. In Cloudflare Pages project settings
2. Go to **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `www.janjansen.net`)

### 2. Update DNS

1. In Cloudflare Dashboard → **DNS**
2. Add CNAME record:
   - **Name**: `www` (or `@` for root domain)
   - **Target**: `jan-jansen-architectuur.pages.dev`

### 3. Update Configuration

Update `nuxt.config.ts` with your custom domain:

```typescript
app: {
  head: {
    link: [
      { rel: 'canonical', href: 'https://www.janjansen.net' }
    ]
  }
}
```

## Deployment Process

### Automatic Deployment

1. **Push to Master**: Any push to the `master` branch triggers deployment
2. **Build Process**: GitHub Actions runs `npm run generate`
3. **Upload**: Static files are uploaded to Cloudflare Pages
4. **Live Site**: Your site is available at `jan-jansen-architectuur.pages.dev`

### Manual Deployment

If needed, you can trigger deployment manually:

1. Go to **GitHub** → **Actions**
2. Select **Deploy to Cloudflare Pages** workflow
3. Click **Run workflow**

## Monitoring and Logs

### GitHub Actions Logs

- View build and deployment logs in GitHub Actions tab
- Check for any build errors or deployment issues

### Cloudflare Pages Logs

- Go to **Cloudflare Pages** → **Your Project** → **Functions**
- View deployment history and logs

## Performance Optimization

### Cloudflare Settings

1. **Auto Minify**: Enable CSS, JS, and HTML minification
2. **Brotli Compression**: Enable for better compression
3. **Caching**: Configure cache rules for optimal performance

### Analytics

1. **Cloudflare Analytics**: Built-in analytics in Cloudflare dashboard
2. **Google Analytics**: Add tracking code if needed

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in `package.json`
   - Check for TypeScript errors

2. **Deployment Failures**:
   - Verify API token permissions
   - Check account ID is correct
   - Ensure project name matches

3. **Routing Issues**:
   - Check `_redirects` file configuration
   - Verify Nuxt routing setup
   - Test SPA routing functionality

### Debug Steps

1. **Local Build Test**:
   ```bash
   npm run generate
   npm run preview
   ```

2. **Check Output**:
   - Verify `.output/public` contains all files
   - Test static files locally

3. **GitHub Actions Logs**:
   - Review build step output
   - Check deployment step results

## Security Considerations

1. **API Tokens**: Keep tokens secure, never commit to repository
2. **Environment Variables**: Use GitHub Secrets for sensitive data
3. **Content Security**: Review content before deployment

## Performance Metrics

Expected performance with Cloudflare Pages:

- **Load Time**: < 2 seconds globally
- **Lighthouse Score**: 90+ for Performance, SEO, Accessibility
- **Global CDN**: Content served from 250+ locations
- **SSL**: Automatic HTTPS with modern TLS

---

For support, contact the development team or refer to [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/).
