<template>
  <section :class="sectionClasses">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-foreground mb-4">{{ title }}</h2>
        <p class="text-lg text-muted-foreground">
          {{ subtitle }}
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          v-for="service in services" 
          :key="service.id"
          class="text-center hover:shadow-lg transition-shadow border-2 border-primary/20 hover:border-primary/40 transition-colors"
        >
          <template #content>
            <div class="p-6">
              <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-primary/10">
                <i :class="`pi ${service.icon} text-2xl text-primary`"></i>
              </div>
              <h3 class="text-lg font-semibold text-foreground mb-2">{{ service.title }}</h3>
              <p class="text-muted-foreground text-sm">{{ service.description }}</p>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Onze Diensten'
  },
  subtitle: {
    type: String,
    default: 'Professionele bouwkundige dienstverlening voor al uw projecten'
  },
  backgroundColor: {
    type: String,
    default: 'py-16'
  },
  includePadding: {
    type: Boolean,
    default: true
  },
  services: {
    type: Array,
    default: () => []
  }
})

// Default services data
const defaultServices = [
  {
    id: 'tekenwerk',
    title: 'Tekenwerk',
    description: 'Professionele technische tekeningen en ontwerpen',
    icon: 'pi-pencil'
  },
  {
    id: 'rekenwerk',
    title: 'Rekenwerk',
    description: 'Nauwkeurige berekeningen en analyses',
    icon: 'pi-calculator'
  },
  {
    id: 'duurzaamheid',
    title: 'Duurzaamheidsadvies',
    description: 'Expertise in energiezuinige oplossingen',
    icon: 'pi-sun'
  },
  {
    id: 'ep-labels',
    title: 'EP Labels',
    description: 'Officiële EP-certificering door ISSO gecertificeerde adviseurs',
    icon: 'pi-verified'
  }
]

// Use provided services or fall back to defaults
const services = computed(() => {
  return props.services.length > 0 ? props.services : defaultServices
})

// Computed
const sectionClasses = computed(() => {
  const classes = [props.backgroundColor]
  if (!props.includePadding) {
    classes.push('py-0')
  }
  return classes.join(' ')
})
</script>
