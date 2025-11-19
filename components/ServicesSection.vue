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
      <Card class="text-center hover:shadow-lg transition-shadow">
        <template #content>
          <div class="p-6">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: rgb(236, 88, 39, 0.1)">
              <i class="pi pi-pencil text-2xl" style="color: rgb(236, 88, 39)"></i>
            </div>
            <h3 class="text-lg font-semibold text-foreground mb-2">Tekenwerk</h3>
            <p class="text-muted-foreground text-sm">Professionele technische tekeningen en ontwerpen</p>
          </div>
        </template>
      </Card>

      <Card class="text-center hover:shadow-lg transition-shadow">
        <template #content>
          <div class="p-6">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: rgb(236, 88, 39, 0.1)">
              <i class="pi pi-calculator text-2xl" style="color: rgb(236, 88, 39)"></i>
            </div>
            <h3 class="text-lg font-semibold text-foreground mb-2">Rekenwerk</h3>
            <p class="text-muted-foreground text-sm">Nauwkeurige berekeningen en analyses</p>
          </div>
        </template>
      </Card>

      <Card class="text-center hover:shadow-lg transition-shadow">
        <template #content>
          <div class="p-6">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: rgb(236, 88, 39, 0.1)">
              <i class="pi pi-sun text-2xl" style="color: rgb(236, 88, 39)"></i>
            </div>
            <h3 class="text-lg font-semibold text-foreground mb-2">Duurzaamheidsadvies</h3>
            <p class="text-muted-foreground text-sm">Expertise in energiezuinige oplossingen</p>
          </div>
        </template>
      </Card>

      <Card class="text-center hover:shadow-lg transition-shadow">
        <template #content>
          <div class="p-6">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: rgb(236, 88, 39, 0.1)">
              <i class="pi pi-verified text-2xl" style="color: rgb(236, 88, 39)"></i>
            </div>
            <h3 class="text-lg font-semibold text-foreground mb-2">EP Labels</h3>
            <p class="text-muted-foreground text-sm">Officiële EP-certificering door ISSO gecertificeerde adviseurs</p>
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
  }
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
