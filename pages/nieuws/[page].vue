<template>
  <NuxtLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-foreground mb-4">Laatste Nieuws</h1>
        <p class="text-lg text-muted-foreground">Blijf op de hoogte van onze laatste projecten, prestaties en inzichten uit de sector</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NewsCard 
          v-for="article in paginatedData" 
          :key="article.path" 
          :article="article"
        />
      </div>
      
      <!-- Pagination Component -->
      <div v-if="totalRecords > itemsPerPage" class="mt-8 flex justify-center">
        <Paginator
          :rows="itemsPerPage"
          :totalRecords="totalRecords"
          :first="(currentPage - 1) * itemsPerPage"
          @page="onPageChange"
          :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport'
          }"
          :rowsPerPageOptions="[6, 12, 24, 48]"
          currentPageReportTemplate="Toont {first} tot {last} van {totalRecords} artikelen"
        />
      </div>
      
      <div v-if="!paginatedData || paginatedData.length === 0" class="text-center py-12">
        <div class="flex flex-col items-center gap-4">
          <i class="pi pi-inbox text-6xl text-muted-foreground"></i>
          <p class="text-muted-foreground text-lg">Momenteel zijn er geen nieuwsartikelen beschikbaar.</p>
          <Button 
            as="a"
            href="/contact" 
            label="Neem Contact Op voor Updates" 
            severity="secondary"
            outlined
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

// Parse page number from route
const currentPage = ref(parseInt(route.params.page) || 1)
const itemsPerPage = ref(12) // Default items per page

// Validate page number
if (currentPage.value < 1) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

// Fetch all news articles
const allArticles = await queryCollection('nieuws').order('date', 'DESC').all()

// Calculate pagination
const totalRecords = computed(() => allArticles.length)
const totalPages = computed(() => Math.ceil(totalRecords.value / itemsPerPage.value))

// Validate current page doesn't exceed total pages
if (currentPage.value > totalPages.value && totalPages.value > 0) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

// Get paginated data
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return allArticles.slice(startIndex, endIndex)
})

// Handle page changes
const onPageChange = (event) => {
  const newPage = Math.floor(event.first / event.rows) + 1
  itemsPerPage.value = event.rows
  
  // Navigate to new page
  router.push(`/nieuws/${newPage}`)
}

// Watch for route changes to update current page
watch(() => route.params.page, (newPage) => {
  const pageNum = parseInt(newPage) || 1
  if (pageNum !== currentPage.value) {
    currentPage.value = pageNum
  }
})

// SEO and meta tags
const pageTitle = currentPage.value === 1 
  ? 'Nieuws - Jan Jansen bouwkundig Adviseurs'
  : `Nieuws - Pagina ${currentPage.value} - Jan Jansen bouwkundig Adviseurs`

const pageDescription = currentPage.value === 1
  ? 'Laatste nieuws, projectupdates en inzichten van Jan Jansen bouwkundig Adviseurs.'
  : `Nieuws pagina ${currentPage.value} - Bekijk meer nieuwsartikelen, projectupdates en inzichten van Jan Jansen bouwkundig Adviseurs.`

useHead({
  title: pageTitle,
  meta: [
    {
      name: 'description',
      content: pageDescription
    },
    {
      property: 'og:title',
      content: pageTitle
    },
    {
      property: 'og:description',
      content: pageDescription
    }
  ],
  link: [
    // Add canonical URL
    {
      rel: 'canonical',
      href: `https://jjbouwkundigadviseurs.nl/nieuws/${currentPage.value}`
    },
    // Add pagination links for SEO
    ...(currentPage.value > 1 ? [{
      rel: 'prev',
      href: currentPage.value === 2 
        ? 'https://jjbouwkundigadviseurs.nl/nieuws/1'
        : `https://jjbouwkundigadviseurs.nl/nieuws/${currentPage.value - 1}`
    }] : []),
    ...(currentPage.value < totalPages.value ? [{
      rel: 'next',
      href: `https://jjbouwkundigadviseurs.nl/nieuws/${currentPage.value + 1}`
    }] : [])
  ]
})

// JSON-LD structured data for better SEO
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: pageTitle,
  description: pageDescription,
  url: `https://jjbouwkundigadviseurs.nl/nieuws/${currentPage.value}`,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: paginatedData.value.length,
    itemListElement: paginatedData.value.map((article, index) => ({
      '@type': 'ListItem',
      position: (currentPage.value - 1) * itemsPerPage.value + index + 1,
      item: {
        '@type': 'NewsArticle',
        headline: article.title,
        datePublished: article.date,
        url: `https://jjbouwkundigadviseurs.nl${article.path}`
      }
    }))
  }
})
</script>
