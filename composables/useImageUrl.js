/**
 * Composable for converting image paths to R2 URLs in production
 */
export const useImageUrl = () => {
  // Cloudflare R2 public URL - hardcoded since it's static generation
  const R2_PUBLIC_URL = 'https://pub-e57279d9148440099d703138fceab6a8.r2.dev'
  
  /**
   * Get image URL with R2 support
   * @param {string} src - Image source path
   * @returns {string} Image URL (R2 URL during generation, local during dev)
   */
  const getImageUrl = (src) => {
    if (!src) return src
    
    // During static generation (build/generate), use R2 URLs
    // During dev server, use local paths
    if (process.env.NODE_ENV === 'production' && src.startsWith('/images/')) {
      const cleanPath = src.startsWith('/') ? src.slice(1) : src
      return `${R2_PUBLIC_URL}/${cleanPath}`
    }
    
    // In development or for external URLs, return as-is
    return src
  }
  
  return {
    getImageUrl
  }
}
