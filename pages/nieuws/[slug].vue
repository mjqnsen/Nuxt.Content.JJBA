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
            <NuxtLink :to="nieuwsBackUrl" class="text-primary hover:underline"
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

        <!-- Featured Image or Gallery -->
        <div v-if="data.gallery && data.gallery.length > 0" class="mb-12">
          <!-- Single Image -->
          <figure v-if="data.gallery.length === 1">
            <img
              :src="data.gallery[0].src"
              :alt="data.gallery[0].alt"
              class="w-full h-64 md:h-96 lg:h-[500px] rounded-lg object-cover"
            />
          </figure>

          <!-- Gallery for Multiple Images -->
          <div v-else class="max-w-4xl mx-auto">
            <Galleria 
              :value="galleryImages" 
              :responsiveOptions="responsiveOptions" 
              :numVisible="5" 
              :circular="true" 
              containerStyle="max-width: 100%"
              class="rounded-lg overflow-hidden"
            >
              <template #item="slotProps">
                <img 
                  :src="slotProps.item.itemImageSrc" 
                  :alt="slotProps.item.alt" 
                  style="width: 100%; display: block"
                />
              </template>
              <template #thumbnail="slotProps">
                <img 
                  :src="slotProps.item.thumbnailImageSrc" 
                  :alt="slotProps.item.alt" 
                  style="width: 80px; height: 60px; display: block"
                />
              </template>
            </Galleria>
          </div>
        </div>

        <!-- Article Content -->
        <div class="w-full">
          <!-- Text content - narrower on desktop -->
          <div class="max-w-2xl mx-auto article-content">
            <ContentRenderer :value="data" />
          </div>
        </div>

        <!-- Navigation -->
        <nav class="mt-12 pt-8 border-t border-border">
          <NuxtLink
            :to="nieuwsBackUrl"
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
            :to="nieuwsBackUrl"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <i class="pi pi-arrow-left"></i>
            <span>Terug naar Nieuws</span>
          </NuxtLink>
        </div>
      </div>
    </article>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed } from "vue";

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

// Transform gallery data for Galleria component
const galleryImages = computed(() => {
  if (!data?.gallery) return [];
  return data.gallery.map(image => ({
    itemImageSrc: image.src,
    thumbnailImageSrc: image.src,
    alt: image.alt
  }));
});

// Responsive options for Galleria
const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4
  },
  {
    breakpoint: '768px',
    numVisible: 3
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
]);

// Determine the target URL for "back to nieuws" navigation
const nieuwsBackUrl = computed(() => {
  // Get the 'from' query parameter (e.g., 'page-3')
  const fromParam = route.query.from;
  
  // Validate the parameter format and return appropriate URL
  if (fromParam && typeof fromParam === 'string' && fromParam.startsWith('page-')) {
    const pageNumber = fromParam.replace('page-', '');
    // Ensure it's a valid number
    if (!isNaN(Number(pageNumber)) && Number(pageNumber) > 0) {
      return `/nieuws/${fromParam}`;
    }
  }
  
  // Fallback to page 1 if no valid 'from' parameter
  return '/nieuws/page-1';
});

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: data?.title,
  description: data?.description,
  image: data?.gallery?.[0]?.src,
  datePublished: data?.date,
  dateModified: data?.updatedAt || data?.date,
  author: {
    "@type": "Organization",
    name: "Jan Jansen bouwkundig adviseurs",
  },
  publisher: {
    "@type": "Organization",
    name: "Jan Jansen bouwkundig adviseurs",
    logo: {
      "@type": "ImageObject",
      url: "https://jjba.nl/JJBAlogo.png",
    },
  },
};

useHead({
  title: data
    ? `${data.title} - Jan Jansen bouwkundig adviseurs`
    : "Nieuwsartikel - Jan Jansen bouwkundig adviseurs",
  meta: [
    {
      name: "description",
      content:
        data?.description ||
        "Nieuwsartikel van Jan Jansen bouwkundig adviseurs",
    },
    // Open Graph
    { property: "og:title", content: data?.title },
    { property: "og:description", content: data?.description },
    { property: "og:image", content: data?.gallery?.[0]?.src },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: data?.date },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: data?.title },
    { name: "twitter:description", content: data?.description },
    { name: "twitter:image", content: data?.gallery?.[0]?.src },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(structuredData),
    },
  ],
});
</script>

<style lang="css" scoped>
  .article-content:deep(h2) {
    @apply text-4xl mb-4 font-bold;
  }

  .article-content:deep(h3) {
    @apply text-2xl mb-4 font-bold;
  }

  .article-content:deep(p:not(p:last-of-type)) {
    @apply mb-10;
  }

  .article-content:deep(ul) {
    @apply list-disc list-inside space-y-2 pl-4 mb-10;
  }

  .article-content:deep(li) {
    @apply leading-relaxed;
  }

</style>
