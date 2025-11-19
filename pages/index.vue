<template>
  <NuxtLayout>
    <div>
      <!-- Hero Section -->
       <section class="relative bg-gradient-to-br from-orange-600 to-orange-500 text-white overflow-hidden" style="background: linear-gradient(to bottom right, rgb(236, 88, 39), rgb(189, 120, 82))">
      <div class="absolute inset-0 bg-black/30"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            De Ruimtes van Morgen Ontwerpen Vandaag
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
            Jan Jansen bouwkundig Adviseurs combineert innovatief ontwerp met duurzame praktijken om ruimtes te creëren die inspireren en blijvend zijn.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Button 
              as="NuxtLink" 
              to="/over-ons"
              severity="warn"
              label="Meer Over Ons"
              size="large"
              class="px-8 py-3"
            />
            <Button 
              as="NuxtLink" 
              to="/contact" 
              label="Start Uw Project"
              severity="secondary"
              size="large"
              class="px-8 py-3"
            />
          </div>
        </div>
      </div>
    </section>


    <!-- Services Section -->
    <ServicesSection 
      background-color="py-16 bg-background"
    />

    <!-- Recent News Section -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-foreground mb-4">Laatste Nieuws</h2>
            <p class="text-lg text-muted-foreground">
              Blijf op de hoogte van onze recente projecten en bedrijfsnieuws
            </p>
          </div>
          <Button 
            as="NuxtLink" 
            to="/nieuws" 
            label="Bekijk Alle Nieuws"
            severity="secondary"
            outlined
            icon="pi pi-arrow-right"
            iconPos="right"
            class="hidden sm:flex"
          />
        </div>
        
        <div v-if="recentNews && recentNews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            v-for="article in recentNews" 
            :key="article._path" 
            class="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            @click="$router.push(article._path)"
          >
            <template #header>
              <div class="h-48 overflow-hidden">
                <img 
                  :src="getImageSrc(article.thumbnail)" 
                  :alt="article.title" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  @error="handleImageError"
                />
              </div>
            </template>
            <template #content>
              <div class="p-6">
                <div class="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <i class="pi pi-calendar"></i>
                  <span>{{ formatDate(article.date) }}</span>
                </div>
                <h3 class="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {{ article.title }}
                </h3>
                <p class="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {{ article.description }}
                </p>
                <Button 
                  label="Lees Meer" 
                  severity="secondary" 
                  text
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  size="small"
                />
              </div>
            </template>
          </Card>
        </div>
        
        <div v-else class="text-center py-12">
          <div class="flex flex-col items-center gap-4">
            <i class="pi pi-inbox text-4xl text-muted-foreground"></i>
            <p class="text-muted-foreground">Geen recent nieuws beschikbaar</p>
          </div>
        </div>
        
        <!-- Mobile View All Button -->
        <div class="text-center mt-8 sm:hidden">
          <Button 
            as="NuxtLink" 
            to="/nieuws" 
            label="Bekijk Alle Nieuws"
            severity="secondary"
            outlined
            icon="pi pi-arrow-right"
            iconPos="right"
          />
        </div>
      </div>
    </section>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Define layout
definePageMeta({
  layout: 'default'
})

// Fetch recent news articles
const recentNews = await queryCollection('nieuws')
  .order('date', 'DESC')
  .limit(3)
  .all()

// Image fallback composable
const { getImageSrc, handleImageError } = useImageFallback()

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('nl-NL', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

useHead({
  title: 'Jan Jansen bouwkundig Adviseurs - De Ruimtes van Morgen Ontwerpen Vandaag',
  meta: [
    {
      name: 'description',
      content: 'Jan Jansen bouwkundig Adviseurs combineert innovatief ontwerp met duurzame praktijken om uitzonderlijke woon- en commerciële ruimtes te creëren.'
    }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}
</style>
