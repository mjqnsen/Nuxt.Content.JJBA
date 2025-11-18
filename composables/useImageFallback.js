/**
 * Composable for handling image fallbacks and error states
 */
export const useImageFallback = () => {
  const defaultPlaceholder = '/images/news/Placeholder.svg'
  
  /**
   * Get image source with fallback
   * @param {string} src - Primary image source
   * @param {string} fallback - Custom fallback image (optional)
   * @returns {string} Image source with fallback
   */
  const getImageSrc = (src, fallback = defaultPlaceholder) => {
    return src || fallback
  }
  
  /**
   * Handle image error events
   * @param {Event} event - Image error event
   * @param {string} fallback - Custom fallback image (optional)
   */
  const handleImageError = (event, fallback = defaultPlaceholder) => {
    if (event.target.src !== fallback) {
      event.target.src = fallback
    }
  }
  
  /**
   * Create image load handler with fallback
   * @param {string} fallback - Custom fallback image (optional)
   * @returns {Function} Error handler function
   */
  const createImageErrorHandler = (fallback = defaultPlaceholder) => {
    return (event) => handleImageError(event, fallback)
  }
  
  return {
    defaultPlaceholder,
    getImageSrc,
    handleImageError,
    createImageErrorHandler
  }
}
