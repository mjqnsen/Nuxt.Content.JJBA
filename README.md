# Zenith Architectuur - Nuxt Content Website

Een moderne architectuur marketing website gebouwd met Nuxt 3 en Nuxt Content in het Nederlands.

## Functies

- **Homepage**: Hero sectie met diensten overzicht en uitgelichte projecten
- **Over Ons Pagina**: Bedrijfsinformatie, teamprofielen en onderscheidingen
- **Nieuws Sectie**: Blog-stijl nieuwsartikelen met thumbnails en gedetailleerde weergaves
- **Contact Pagina**: Contactinformatie en bedrijfsdetails
- **Responsive Design**: Mobile-first ontwerp met Tailwind CSS

## Nederlandse Routes

De website gebruikt Nederlandse route namen:
- `/` - Homepage
- `/over-ons` - Over Ons (voorheen `/about`)
- `/nieuws` - Nieuws (voorheen `/news`) 
- `/nieuws/[slug]` - Individuele nieuwsartikelen
- `/contact` - Contact

## Automatische Redirects

Oude Engelse routes worden automatisch doorverwezen naar de nieuwe Nederlandse routes via middleware.

## News Articles Structure

Each news article includes:
- **Title**: Article headline
- **Description**: Brief summary for listings
- **Date**: Publication date
- **Thumbnail**: Image for news overview page
- **Featured Image**: Main article image
- **Content**: Full article content in Markdown
- **Gallery**: Optional additional images with captions

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
├── content/
│   ├── about.md
│   ├── contact.md
│   ├── index.md
│   └── news/
│       ├── sustainability-award-2024.md
│       ├── riverside-community-groundbreaking.md
│       └── team-expansion-september-2024.md
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   ├── about.vue
│   ├── contact.vue
│   └── news/
│       ├── index.vue
│       └── [...slug].vue
├── public/
│   └── images/
│       └── news/
└── assets/
    └── css/
        └── main.css
```

## Adding New Content

### News Articles

Create new `.md` files in the `content/news/` directory with the following frontmatter:

```yaml
---
title: "Article Title"
description: "Brief description for listings"
date: "YYYY-MM-DD"
thumbnail: "/images/news/thumbnail.jpg"
image: "/images/news/featured-image.jpg"
gallery:
  - src: "/images/news/gallery-1.jpg"
    alt: "Alt text"
    caption: "Image caption"
---
```

### Other Pages

Edit the corresponding `.md` files in the `content/` directory to update page content.

## Technologies Used

- **Nuxt 3**: Vue.js framework
- **Nuxt Content**: File-based CMS
- **PrimeVue 4**: Vue.js UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **Markdown**: Content authoring

## UI Components

The site uses PrimeVue 4 components integrated with Tailwind CSS:
- **Navigation**: Menubar and Sidebar for responsive navigation
- **Cards**: For service listings, project showcases, and news articles
- **Buttons**: Various styles and states throughout the site
- **Icons**: PrimeIcons for consistent iconography
- **Layout**: Responsive grid system with PrimeVue containers
- **Images**: Custom AppImage component with automatic fallback handling

## Image Fallback System

The site includes a robust image fallback system:

### Default Placeholder
- **Location**: `/public/images/news/Placeholder.svg`
- **Usage**: Automatic fallback for all news articles and images
- **Customizable**: Can specify custom fallback images per component

### Composable: `useImageFallback()`
```javascript
const { getImageSrc, handleImageError } = useImageFallback()

// Get image with fallback
const imageSrc = getImageSrc(originalSrc, customFallback)

// Handle image errors
<img @error="handleImageError" />
```

### AppImage Component
```vue
<AppImage 
  :src="article.thumbnail" 
  :alt="article.title"
  fallback="/custom/fallback.jpg"
  class="w-full h-48 object-cover"
/>
```

### Features
- ✅ **Automatic Fallback**: Images automatically fall back to placeholder on error
- ✅ **Custom Fallbacks**: Specify different fallback images per use case
- ✅ **Error Handling**: Graceful handling of broken or missing images
- ✅ **Performance**: Efficient loading with proper error states

## Customization

- Update company information in `layouts/default.vue`
- Modify styling in `assets/css/main.css` and component templates
- Add new pages by creating files in the `pages/` directory
- Update content by editing Markdown files in the `content/` directory

---

Built with ❤️ by Zenith Architecture
