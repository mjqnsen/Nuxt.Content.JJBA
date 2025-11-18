# Jan Jansen bouwkundig Adviseurs - Architecture Marketing Website

A modern, responsive architecture marketing website built with Nuxt 3, featuring a complete Dutch design and content management system.

![Architecture Website](public/JJBAlogo.png)

## 🏗️ About

This is a professional marketing website for **Jan Jansen bouwkundig Adviseurs**, a Dutch architecture firm. The site showcases their services, projects, and company information in a modern, responsive design with a custom orange color theme.

## ✨ Features

### 🎨 Design & UI
- **Custom Orange Theme**: Professional orange color palette (`rgb(236, 88, 39)`)
- **Dark Mode**: Modern dark theme with proper contrast
- **Responsive Design**: Mobile-first approach with drawer navigation
- **PrimeVue Components**: Professional UI components with custom theming
- **Tailwind CSS**: Utility-first styling with custom CSS variables

### 🌐 Content & Language
- **Complete Dutch Localization**: All content in Dutch (nl-NL)
- **File-based CMS**: Powered by Nuxt Content for easy content management
- **SEO Optimized**: Proper meta tags and structured content
- **Image Fallback System**: Automatic placeholder handling

### 📱 User Experience
- **Mobile Drawer**: Professional mobile navigation with PrimeVue Drawer
- **Smooth Animations**: CSS transitions and hover effects
- **Interactive Elements**: Button hover states and visual feedback
## 🛠️ Technology Stack

- **[Nuxt 3](https://nuxt.com/)** - Vue.js framework
- **[Nuxt Content](https://content.nuxtjs.org/)** - File-based CMS
- **[PrimeVue 4](https://primevue.org/)** - UI component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[PrimeIcons](https://primevue.org/icons)** - Icon library
- **TypeScript** - Type safety

## 📄 Pages

### 🏠 Homepage (`/`)
- Hero section with company introduction
- Services overview with icons
- Recent projects showcase
- Latest news integration
- Call-to-action sections

### 👥 About Us (`/over-ons`)
- Company history and mission
- Team information
- Values and approach
- Professional background

### 📰 News (`/nieuws`)
- Dynamic news listing
- Individual article pages
- Date and metadata display
- Content filtering

### 📞 Contact (`/contact`)
- Contact form
- Office information
- Business hours
- Location details

## 🎨 Color Scheme

```css
/* Primary Colors */
--primary: rgb(236, 88, 39)    /* Accent Orange */
--secondary: rgb(189, 120, 82) /* Secondary Orange */
--dark: rgb(50, 50, 49)        /* Dark Gray */

/* Background Colors (Dark Mode) */
--background: hsl(0, 0%, 8%)   /* Very Dark */
--card: hsl(0, 0%, 12%)        /* Dark Cards */
--muted: hsl(0, 0%, 15%)       /* Muted Areas */
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mjqnsen/Nuxt.Content.JJBA.git
   cd Nuxt.Content.JJBA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
```

## 📁 Project Structure

```
├── assets/
│   ├── css/main.css           # Global styles and CSS variables
│   └── presets/zenith.js      # Custom PrimeVue theme preset
├── components/
│   └── AppImage.vue           # Reusable image component
├── composables/
│   └── useImageFallback.js    # Image fallback utility
├── content/                   # Markdown content files
│   ├── index.md              # Homepage content
│   ├── over-ons.md           # About page content
│   ├── contact.md            # Contact page content
│   └── nieuws/               # News articles
├── layouts/
│   └── default.vue           # Main layout with navigation
├── pages/                    # Vue.js pages
├── public/                   # Static assets
│   ├── JJBAlogo.png         # Company logo
│   └── JJBAIcon.png         # Favicon
└── nuxt.config.ts           # Nuxt configuration
```

## 🎯 Key Features Implementation

### Custom PrimeVue Theme
The site uses a custom PrimeVue theme preset with orange branding:
- Custom color palette integration
- Dark mode support
- Component-specific styling

### Mobile Navigation
Professional mobile drawer navigation:
- Full-height drawer with close button
- Company logo integration
- Smooth animations and transitions

### Content Management
Powered by Nuxt Content for easy content updates:
- Markdown-based content
- Dynamic routing
- Meta information handling

## 🔧 Configuration

### Theme Customization
Edit `assets/presets/zenith.js` to modify the PrimeVue theme colors and styling.

### Content Updates
Add or modify content files in the `content/` directory using Markdown format.

### Styling Changes
Update CSS variables in `assets/css/main.css` for global style modifications.

## 🌟 Company Information

**Jan Jansen bouwkundig Adviseurs**
- **Address**: Het Vergun 26b, 6931 KD Westervoort
- **Phone**: +31 (0)26 319 4411
- **Email**: info@janjansen.net
- **Hours**: Ma-Vr: 9:00-18:00 | Za: 10:00-16:00

## 📝 License

This project is proprietary software for Jan Jansen bouwkundig Adviseurs.

## 🤝 Contributing

This is a private project for Jan Jansen bouwkundig Adviseurs. For any changes or updates, please contact the development team.

---

*Built with ❤️ for modern architecture marketing*
