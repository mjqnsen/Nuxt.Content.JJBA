<template>
  <NuxtLayout>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div>
      <div v-if="data">
        <!-- Article Header -->
        <div class="mb-8">
          <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <i class="pi pi-calendar"></i>
            <span>{{ formatDate(data.date) }}</span>
          </div>
          <h1 class="text-4xl font-bold text-foreground mb-6">
            {{ data.title }}
          </h1>
          <div v-if="data.description" class="text-lg text-muted-foreground mb-6 p-4 bg-muted rounded-lg border-l-4 border-primary">
            {{ data.description }}
          </div>
        </div>

        <!-- Featured Image -->
        <div class="mb-8">
          <img 
            :src="data.image" 
            :alt="data.title" 
            class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        <!-- Article Content -->
        <div class="prose prose-lg max-w-none">
          <ContentRenderer :value="data" />
        </div>

        <!-- Additional Images -->
        <div v-if="data.gallery && data.gallery.length > 0" class="mt-12">
          <h3 class="text-2xl font-semibold text-foreground mb-6">Project Galerij</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card v-for="(image, index) in data.gallery" :key="index" class="overflow-hidden">
              <template #header>
                <img 
                  :src="image.src" 
                  :alt="image.alt || `Galerij afbeelding ${index + 1}`" 
                  class="w-full h-64 object-cover"
                />
              </template>
              <template #content v-if="image.caption">
                <div class="p-4">
                  <p class="text-sm text-muted-foreground">{{ image.caption }}</p>
                </div>
              </template>
            </Card>
          </div>
        </div>

        <!-- Back to News -->
        <div class="mt-12 pt-8 border-t border-border">
          <Button 
            as="NuxtLink"
            to="/nieuws" 
            label="Terug naar Nieuws"
            severity="secondary"
            outlined
            icon="pi pi-arrow-left"
          />
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <div class="flex flex-col items-center gap-6">
          <i class="pi pi-exclamation-triangle text-6xl text-muted-foreground"></i>
          <h1 class="text-4xl font-bold text-foreground">Artikel Niet Gevonden</h1>
          <p class="text-lg text-muted-foreground max-w-md">Het nieuwsartikel dat u zoekt bestaat niet of is mogelijk verplaatst.</p>
          <Button 
            as="NuxtLink"
            to="/nieuws" 
            label="Bekijk Alle Nieuws"
            icon="pi pi-arrow-left"
          />
        </div>
      </div>
    </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const slug = useRoute().params.slug
const data = await queryCollection('nieuws').path(`/nieuws/${slug}`).first()

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
  title: data ? `${data.title} - Jan Jansen bouwkundig Adviseurs` : 'Nieuwsartikel - Jan Jansen bouwkundig Adviseurs',
  meta: [
    {
      name: 'description',
      content: data?.description || 'Nieuwsartikel van Jan Jansen bouwkundig Adviseurs'
    }
  ]
})
</script>
