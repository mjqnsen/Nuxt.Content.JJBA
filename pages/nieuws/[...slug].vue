<template>
  <NuxtLayout>
    <!-- Article Container -->
    <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="data">
        <!-- Breadcrumb -->
        <nav class="mb-6">
          <div class="flex items-center gap-2 text-sm">
            <NuxtLink to="/" class="text-primary hover:underline"
              >Home</NuxtLink
            >
            <span class="text-muted-foreground">•</span>
            <NuxtLink to="/nieuws" class="text-primary hover:underline"
              >Nieuws</NuxtLink
            >
            <span class="text-muted-foreground">•</span>
            <span class="text-muted-foreground">{{ data.title }}</span>
          </div>
        </nav>

        <!-- Article Header -->
        <header class="mb-8">
          <!-- Date and Category -->
          <div
            class="flex items-center gap-4 text-sm text-muted-foreground mb-4"
          >
            <time :datetime="data.date" class="flex items-center gap-2">
              <i class="pi pi-calendar"></i>
              <span>{{ formatDate(data.date) }}</span>
            </time>
            <span
              v-if="data.category"
              class="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
            >
              {{ data.category }}
            </span>
          </div>

          <!-- Main Title -->
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6"
          >
            {{ data.title }}
          </h1>

          <!-- Lead/Description -->
          <div
            v-if="data.description"
            class="text-xl leading-relaxed text-muted-foreground font-light mb-8 border-l-4 border-primary pl-6"
          >
            {{ data.description }}
          </div>
        </header>

        <!-- Featured Image -->
        <figure v-if="data.image" class="mb-12">
          <img
            :src="data.image"
            :alt="data.title"
            class="w-full h-64 md:h-96 lg:h-[500px] rounded-lg"
            pt:image:class="object-cover"
            preview
          />
          <figcaption
            v-if="data.imageCaption"
            class="mt-2 text-sm text-muted-foreground italic text-center"
          >
            {{ data.imageCaption }}
          </figcaption>
        </figure>

        <!-- Article Content -->
        <div class="w-full">
          <!-- Text content - narrower on desktop -->
          <div class="max-w-2xl mx-auto article-content">
            <ContentRenderer :value="data" />
          </div>
        </div>

        <!-- Additional Images - Full width -->
        <div v-if="data.gallery && data.gallery.length > 0" class="mt-12">
          <div class="max-w-2xl mx-auto mb-6">
            <h3 class="text-2xl font-semibold text-foreground">
              Project Galerij
            </h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Image
              v-for="(image, index) in data.gallery"
              :src="image.src"
              :alt="image.alt"
              :key="index"
              class="w-full h-64 object-cover"
              preview
            />
          </div>
        </div>

        <!-- Navigation -->
        <nav class="mt-12 pt-8 border-t border-border">
          <NuxtLink
            to="/nieuws"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <i class="pi pi-arrow-left"></i>
            <span>Terug naar Nieuws</span>
          </NuxtLink>
        </nav>
      </div>

      <!-- 404 State -->
      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="mb-8">
            <i
              class="pi pi-exclamation-triangle text-6xl text-muted-foreground"
            ></i>
          </div>
          <h1 class="text-3xl font-bold text-foreground mb-4">
            Artikel Niet Gevonden
          </h1>
          <p class="text-lg text-muted-foreground mb-8">
            Het nieuwsartikel dat u zoekt bestaat niet of is mogelijk
            verplaatst.
          </p>
          <NuxtLink
            to="/nieuws"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <i class="pi pi-arrow-left"></i>
            <span>Bekijk Alle Nieuws</span>
          </NuxtLink>
        </div>
      </div>
    </article>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute();
const slug = route.params.slug;
const data = await queryCollection("nieuws").path(`/nieuws/${slug}`).first();

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("nl-NL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: data?.title,
  description: data?.description,
  image: data?.image,
  datePublished: data?.date,
  dateModified: data?.updatedAt || data?.date,
  author: {
    "@type": "Organization",
    name: "Jan Jansen bouwkundig Adviseurs",
  },
  publisher: {
    "@type": "Organization",
    name: "Jan Jansen bouwkundig Adviseurs",
    logo: {
      "@type": "ImageObject",
      url: "https://jjba.nl/JJBAlogo.png",
    },
  },
};

useHead({
  title: data
    ? `${data.title} - Jan Jansen bouwkundig Adviseurs`
    : "Nieuwsartikel - Jan Jansen bouwkundig Adviseurs",
  meta: [
    {
      name: "description",
      content:
        data?.description ||
        "Nieuwsartikel van Jan Jansen bouwkundig Adviseurs",
    },
    // Open Graph
    { property: "og:title", content: data?.title },
    { property: "og:description", content: data?.description },
    { property: "og:image", content: data?.image },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: data?.date },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: data?.title },
    { name: "twitter:description", content: data?.description },
    { name: "twitter:image", content: data?.image },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(structuredData),
    },
  ],
});
</script>

<style>
/* Article content styling */
.article-content {
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    sans-serif;
}

/* Headings - Using multiple selectors for better specificity */
.article-content :deep(h1),
.article-content h1 {
  font-size: 2.5rem !important;
  font-weight: 700 !important;
  margin: 3rem 0 1.5rem 0 !important;
  line-height: 1.2 !important;
  color: hsl(var(--foreground)) !important;
}

.article-content :deep(h2),
.article-content h2 {
  font-size: 2rem !important;
  font-weight: 600 !important;
  margin: 2.5rem 0 1rem 0 !important;
  line-height: 1.3 !important;
  color: hsl(var(--foreground)) !important;
  border-bottom: 2px solid hsl(var(--border)) !important;
  padding-bottom: 0.5rem !important;
}

.article-content :deep(h3),
.article-content h3 {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  margin: 2rem 0 1rem 0 !important;
  line-height: 1.4 !important;
  color: hsl(var(--foreground)) !important;
}

.article-content :deep(h4),
.article-content h4 {
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  margin: 1.5rem 0 0.75rem 0 !important;
  line-height: 1.4 !important;
  color: hsl(var(--foreground)) !important;
}

.article-content :deep(h5),
.article-content h5 {
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  margin: 1.25rem 0 0.5rem 0 !important;
  line-height: 1.4 !important;
  color: hsl(var(--foreground)) !important;
}

.article-content :deep(h6),
.article-content h6 {
  font-size: 1rem !important;
  font-weight: 600 !important;
  margin: 1rem 0 0.5rem 0 !important;
  line-height: 1.4 !important;
  color: hsl(var(--foreground)) !important;
}

/* Paragraphs with more spacing */
.article-content :deep(p) {
  margin: 0 0 2rem 0;
  line-height: 1.7;
  color: hsl(var(--foreground));
}

/* Last paragraph should not have bottom margin */
.article-content :deep(p:last-child) {
  margin-bottom: 0;
}

/* First paragraph after heading should have less top margin */
.article-content :deep(h1 + p),
.article-content :deep(h2 + p),
.article-content :deep(h3 + p),
.article-content :deep(h4 + p) {
  margin-top: 0;
}

/* Lists */
.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.article-content :deep(li) {
  margin: 0.75rem 0;
  line-height: 1.7;
  color: hsl(var(--foreground));
}

/* Blockquotes */
.article-content :deep(blockquote) {
  border-left: 4px solid hsl(var(--primary));
  padding-left: 1.5rem;
  padding: 1rem 0 1rem 1.5rem;
  margin: 2rem 0;
  background: hsl(var(--muted) / 0.3);
  border-radius: 0 0.5rem 0.5rem 0;
  font-style: italic;
  font-size: 1.125rem;
}

/* Links */
.article-content :deep(a) {
  color: hsl(var(--primary));
  text-decoration: underline;
  font-weight: 500;
}

.article-content :deep(a:hover) {
  text-decoration: none;
}

/* Strong and emphasis */
.article-content :deep(strong) {
  font-weight: 600;
  color: hsl(var(--foreground));
}

.article-content :deep(em) {
  font-style: italic;
}

/* Code */
.article-content :deep(code) {
  background: hsl(var(--muted));
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: "Monaco", "Menlo", monospace;
  font-size: 0.875rem;
}

.article-content :deep(pre) {
  background: hsl(var(--muted));
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.article-content :deep(pre code) {
  background: transparent;
  padding: 0;
}

/* Images within content */
.article-content :deep(img) {
  border-radius: 0.5rem;
  margin: 2rem 0;
  max-width: 100%;
  height: auto;
}
</style>
