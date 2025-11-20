<template>
  <NuxtLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-foreground mb-4">Laatste Nieuws</h1>
      <p class="text-lg text-muted-foreground">Blijf op de hoogte van onze laatste projecten, prestaties en inzichten uit de sector</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NewsCard 
        v-for="article in data" 
        :key="article.path" 
        :article="article"
      />
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
const data = await queryCollection('nieuws').order('date', 'DESC').all()

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


