<template>
  <section class="py-16 bg-muted/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-foreground mb-4">{{ title }}</h2>
        <p class="text-lg text-muted-foreground">
          {{ subtitle }}
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card 
          v-for="project in projects" 
          :key="project.id" 
          class="overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <template #header>
            <div v-if="true" class="h-50 overflow-hidden">
              <img 
                src="/images/news/Placeholder.svg" 
                :alt="project.title" 
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                @error="handleImageError"
              />
            </div>
            <div v-else class="h-48 bg-gradient-to-br from-muted to-muted-foreground/20"></div>
          </template>
          <template #content>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-3 text-foreground">{{ project.title }}</h3>
              <p class="text-muted-foreground mb-4">{{ project.description }}</p>
              <Button 
                :label="buttonLabel" 
                severity="secondary" 
                text
                icon="pi pi-arrow-right"
                iconPos="right"
                size="small"
                @click="handleProjectClick(project)"
              />
            </div>
          </template>
        </Card>
      </div>
      
      <!-- View All Button -->
      <div v-if="showViewAllButton" class="text-center mt-8">
        <Button 
          :as="viewAllButtonLink ? 'NuxtLink' : 'button'"
          :to="viewAllButtonLink"
          :label="viewAllButtonLabel"
          severity="secondary"
          outlined
          icon="pi pi-arrow-right"
          iconPos="right"
          @click="handleViewAllClick"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useImageFallback } from '~/composables/useImageFallback'

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Uitgelichte Projecten'
  },
  subtitle: {
    type: String,
    default: 'Een blik op onze recente architecturale prestaties'
  },
  projects: {
    type: Array,
    default: () => [
      {
        id: 1,
        title: 'Modern Wooncomplex',
        description: 'Duurzame woonruimtes met innovatieve ontwerpelementen',
        image: null
      },
      {
        id: 2,
        title: 'Bedrijfshoofkantoor',
        description: 'Een iconisch gebouw dat de stadshorizon definieert',
        image: null
      },
      {
        id: 3,
        title: 'Cultureel Centrum',
        description: 'Gemeenschapsruimte die mensen samenbrengt',
        image: null
      }
    ]
  },
  buttonLabel: {
    type: String,
    default: 'Bekijk Project'
  },
  showViewAllButton: {
    type: Boolean,
    default: false
  },
  viewAllButtonLabel: {
    type: String,
    default: 'Bekijk Alle Projecten'
  },
  viewAllButtonLink: {
    type: String,
    default: null
  },
  backgroundColor: {
    type: String,
    default: 'bg-muted/50'
  }
})

// Emits
const emit = defineEmits(['project-click', 'view-all-click'])

// Image fallback composable
const { handleImageError } = useImageFallback()

// Methods
const handleProjectClick = (project) => {
  emit('project-click', project)
}

const handleViewAllClick = () => {
  emit('view-all-click')
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
