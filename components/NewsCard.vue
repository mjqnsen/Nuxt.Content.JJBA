<template>
  <Card 
    class="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
    @click="handleClick"
    pt:header:class="h-64 overflow-hidden"
    pt:content:class="p-4"
  >
    <template #header>
        <img 
          :src="article.gallery?.[0]?.src || '/images/news/Placeholder.svg'" 
          :alt="article.gallery?.[0]?.alt || article.title" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
    </template>
    <template #content>
        <div class="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <i class="pi pi-calendar text-xs"></i>
          <span>{{ formatDate(article.date) }}</span>
        </div>
        <h3 class="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {{ article.title }}
        </h3>
        <p class="text-muted-foreground text-xs line-clamp-2 mb-3">
          {{ article.description }}
        </p>
        <Button 
          label="Lees Meer"
          as="a"
          :href="article._path || article.path"
          severity="secondary" 
          text
          icon="pi pi-arrow-right"
          iconPos="right"
          size="small"
          class="text-xs"
        />
    </template>
  </Card>
</template>

<script setup>
// Props
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

// Router for navigation
const router = useRouter()

// Handle card click
const handleClick = () => {
  const path = props.article._path || props.article.path
  if (path) {
    // Handle different path formats
    const cleanPath = path.replace('/nieuws/', '/nieuws/')
    router.push(cleanPath)
  }
}

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('nl-NL', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}
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
