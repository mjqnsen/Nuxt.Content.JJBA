<template>
  <NuxtLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-foreground mb-4">Laatste Nieuws</h1>
      <p class="text-lg text-muted-foreground">Blijf op de hoogte van onze laatste projecten, prestaties en inzichten uit de sector</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card v-for="article in data" :key="article._path" class="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer" @click="$router.push(article._path.replace('/nieuws/', '/nieuws/'))">
        <template #header>
          <div class="h-48 overflow-hidden">
            <img 
              :src="getImageSrc(article.thumbnail)" 
              :alt="article.title" 
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
            <h2 class="text-xl font-semibold text-foreground mb-3 hover:text-primary transition-colors">
              {{ article.title }}
            </h2>
            <p class="text-muted-foreground line-clamp-3 mb-4">
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
    
    <div v-if="!data || data.length === 0" class="text-center py-12">
      <div class="flex flex-col items-center gap-4">
        <i class="pi pi-inbox text-6xl text-muted-foreground"></i>
        <p class="text-muted-foreground text-lg">Momenteel zijn er geen nieuwsartikelen beschikbaar.</p>
        <Button 
          as="NuxtLink" 
          to="/contact" 
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
const { data } = await useAsyncData('nieuws', () => queryCollection('nieuws').sort({ date: -1 }).all())

// Image fallback composable
const { getImageSrc, handleImageError } = useImageFallback()

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('nl-NL', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

useHead({
  title: 'Nieuws - Jan Jansen bouwkundig Adviseurs',
  meta: [
    {
      name: 'description',
      content: 'Laatste nieuws, projectupdates en inzichten van Jan Jansen bouwkundig Adviseurs.'
    }
  ]
})
</script>

<style scoped>
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}
</style>
