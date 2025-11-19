<template>
  <NuxtLayout>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold mb-4">Energielabel Offerte Aanvragen</h1>
        <p class="text-xl opacity-90">
          Vul onderstaand formulier in en ontvang binnen 24 uur een offerte op maat
        </p>
      </div>
    </section>

    <!-- Form Section -->
    <section class="py-16 bg-background">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <template #header>
            <div class="p-6 bg-muted/50">
              <h2 class="text-2xl font-semibold text-foreground">Offerte Formulier</h2>
              <p class="text-muted-foreground">Alle velden met * zijn verplicht</p>
            </div>
          </template>
          <template #content>
            <form @submit.prevent="submitForm" class="p-6 space-y-8">
              <!-- Property Type Selection -->
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-foreground">Type Pand *</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div 
                    v-for="type in propertyTypes" 
                    :key="type.value"
                    @click="formData.propertyType = type.value"
                    class="p-4 border-2 rounded-lg cursor-pointer transition-all"
                    :class="formData.propertyType === type.value 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-200 hover:border-primary/50'"
                  >
                    <div class="text-center">
                      <i :class="[type.icon, 'text-2xl mb-2', formData.propertyType === type.value ? 'text-primary' : 'text-muted-foreground']"></i>
                      <h4 class="font-medium" 
                          :class="formData.propertyType === type.value ? 'text-primary' : 'text-foreground'">
                        {{ type.label }}
                      </h4>
                      <p class="text-sm text-muted-foreground">{{ type.price }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Information -->
              <Divider />
              <div class="space-y-6">
                <h3 class="text-xl font-semibold text-foreground">Contactgegevens</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Voornaam *
                    </label>
                    <InputText 
                      v-model="formData.firstName" 
                      class="w-full"
                      :class="{ 'p-invalid': errors.firstName }"
                    />
                    <small v-if="errors.firstName" class="p-error">{{ errors.firstName }}</small>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Achternaam *
                    </label>
                    <InputText 
                      v-model="formData.lastName" 
                      class="w-full"
                      :class="{ 'p-invalid': errors.lastName }"
                    />
                    <small v-if="errors.lastName" class="p-error">{{ errors.lastName }}</small>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      E-mailadres *
                    </label>
                    <InputText 
                      v-model="formData.email" 
                      type="email"
                      class="w-full"
                      :class="{ 'p-invalid': errors.email }"
                    />
                    <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Telefoonnummer *
                    </label>
                    <InputText 
                      v-model="formData.phone" 
                      class="w-full"
                      :class="{ 'p-invalid': errors.phone }"
                    />
                    <small v-if="errors.phone" class="p-error">{{ errors.phone }}</small>
                  </div>
                </div>
              </div>

              <!-- Property Details -->
              <Divider />
              <div class="space-y-6">
                <h3 class="text-xl font-semibold text-foreground">Pand Details</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Straat + Huisnummer *
                    </label>
                    <InputText 
                      v-model="formData.address" 
                      class="w-full"
                      :class="{ 'p-invalid': errors.address }"
                    />
                    <small v-if="errors.address" class="p-error">{{ errors.address }}</small>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Postcode *
                    </label>
                    <InputText 
                      v-model="formData.postalCode" 
                      class="w-full"
                      :class="{ 'p-invalid': errors.postalCode }"
                      placeholder="1234 AB"
                    />
                    <small v-if="errors.postalCode" class="p-error">{{ errors.postalCode }}</small>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Plaats *
                    </label>
                    <InputText 
                      v-model="formData.city" 
                      class="w-full"
                      :class="{ 'p-invalid': errors.city }"
                    />
                    <small v-if="errors.city" class="p-error">{{ errors.city }}</small>
                  </div>
                  <div v-if="showSurfaceArea">
                    <label class="block text-sm font-medium text-foreground mb-2">
                      {{ surfaceAreaLabel }}
                    </label>
                    <InputNumber 
                      v-model="formData.surfaceArea" 
                      class="w-full"
                      suffix=" m²"
                      :min="0"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-foreground mb-2">
                    Bouwjaar (indien bekend)
                  </label>
                  <InputNumber 
                    v-model="formData.buildYear" 
                    class="w-full"
                    :min="1800"
                    :max="new Date().getFullYear()"
                  />
                </div>
              </div>

              <!-- Timeline -->
              <Divider />
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-foreground">Wanneer heeft u het energielabel nodig?</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    v-for="timeline in timelines" 
                    :key="timeline.value"
                    @click="formData.timeline = timeline.value"
                    class="p-4 border-2 rounded-lg cursor-pointer transition-all text-center"
                    :class="formData.timeline === timeline.value 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-gray-200 hover:border-primary/50 text-foreground'"
                  >
                    <i :class="timeline.icon" class="text-xl mb-2"></i>
                    <p class="font-medium">{{ timeline.label }}</p>
                  </div>
                </div>
              </div>

              <!-- Additional Information -->
              <Divider />
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-foreground">Aanvullende informatie</h3>
                <Textarea 
                  v-model="formData.additionalInfo" 
                  rows="4" 
                  class="w-full"
                  placeholder="Heeft u nog specifieke vragen of opmerkingen? (optioneel)"
                />
              </div>

              <!-- Submit Button -->
              <Divider />
              <div class="flex flex-col sm:flex-row gap-4 justify-end">
                <Button 
                  type="button"
                  label="Formulier Wissen" 
                  severity="secondary" 
                  outlined
                  icon="pi pi-refresh"
                  @click="resetForm"
                />
                <Button 
                  type="submit"
                  label="Offerte Aanvragen" 
                  icon="pi pi-send"
                  iconPos="right"
                  :loading="isSubmitting"
                  size="large"
                  class="px-8"
                />
              </div>
            </form>
          </template>
        </Card>
      </div>
    </section>

    <!-- Contact Info -->
    <section class="py-12 bg-muted/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 class="text-xl font-semibold text-foreground mb-4">
          Liever direct contact?
        </h3>
        <p class="text-muted-foreground mb-6">
          Bel ons gerust voor een vrijblijvend gesprek of stuur een e-mail
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            as="a" 
            href="tel:0263115990" 
            label="026 311 5990"
            icon="pi pi-phone"
            severity="secondary"
            outlined
          />
          <Button 
            as="a" 
            href="mailto:info@janjansen.net" 
            label="info@janjansen.net"
            icon="pi pi-envelope"
            severity="secondary"
            outlined
          />
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Form data
const formData = ref({
  propertyType: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  postalCode: '',
  city: '',
  surfaceArea: null,
  buildYear: null,
  timeline: '',
  additionalInfo: ''
})

// Form validation errors
const errors = ref({})
const isSubmitting = ref(false)

// Property types with pricing
const propertyTypes = [
  {
    value: 'appartement',
    label: 'Appartement',
    price: '€420,- incl. BTW',
    icon: 'pi pi-home'
  },
  {
    value: 'rijtjeshuis',
    label: 'Rij/Hoekwoning',
    price: '€450,- incl. BTW',
    icon: 'pi pi-home'
  },
  {
    value: 'villa',
    label: 'Villa',
    price: '€550,- incl. BTW',
    icon: 'pi pi-home'
  },
  {
    value: 'utiliteit-150',
    label: 'Utiliteit < 150m²',
    price: '€595,- excl. BTW',
    icon: 'pi pi-building'
  },
  {
    value: 'utiliteit-400',
    label: 'Utiliteit < 400m²',
    price: '€795,- excl. BTW',
    icon: 'pi pi-building'
  },
  {
    value: 'utiliteit-groot',
    label: 'Utiliteit > 400m²',
    price: 'Op aanvraag',
    icon: 'pi pi-building'
  },
  {
    value: 'maatwerk',
    label: 'Maatwerkadvies',
    price: 'Op aanvraag',
    icon: 'pi pi-cog'
  }
]

// Timeline options
const timelines = [
  {
    value: 'urgent',
    label: 'Binnen 1 week',
    icon: 'pi pi-clock'
  },
  {
    value: 'normal',
    label: 'Binnen 2-3 weken',
    icon: 'pi pi-calendar'
  },
  {
    value: 'flexible',
    label: 'Geen haast',
    icon: 'pi pi-calendar-plus'
  }
]

// Computed properties
const showSurfaceArea = computed(() => {
  return formData.value.propertyType.includes('utiliteit') || formData.value.propertyType === 'villa'
})

const surfaceAreaLabel = computed(() => {
  if (formData.value.propertyType.includes('utiliteit')) {
    return 'Bruto Vloer Oppervlakte (BVO) *'
  }
  return 'Gebruiks Oppervlakte (GBO)'
})

// Get property type from URL params
onMounted(() => {
  const route = useRoute()
  if (route.query.type) {
    formData.value.propertyType = route.query.type
  }
})

// Form validation
const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.propertyType) {
    errors.value.propertyType = 'Selecteer een type pand'
  }
  
  if (!formData.value.firstName) {
    errors.value.firstName = 'Voornaam is verplicht'
  }
  
  if (!formData.value.lastName) {
    errors.value.lastName = 'Achternaam is verplicht'
  }
  
  if (!formData.value.email) {
    errors.value.email = 'E-mailadres is verplicht'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'Ongeldig e-mailadres'
  }
  
  if (!formData.value.phone) {
    errors.value.phone = 'Telefoonnummer is verplicht'
  }
  
  if (!formData.value.address) {
    errors.value.address = 'Adres is verplicht'
  }
  
  if (!formData.value.postalCode) {
    errors.value.postalCode = 'Postcode is verplicht'
  } else if (!/^\d{4}\s?[A-Z]{2}$/i.test(formData.value.postalCode)) {
    errors.value.postalCode = 'Ongeldige postcode (bijv. 1234 AB)'
  }
  
  if (!formData.value.city) {
    errors.value.city = 'Plaats is verplicht'
  }
  
  return Object.keys(errors.value).length === 0
}

// Form submission
const submitForm = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Here you would normally send the data to your backend
    console.log('Form submitted:', formData.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message (you might want to use a toast or redirect)
    alert('Bedankt voor uw aanvraag! We nemen binnen 24 uur contact met u op.')
    
    resetForm()
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Er ging iets mis. Probeer het opnieuw of neem direct contact op.')
  } finally {
    isSubmitting.value = false
  }
}

// Reset form
const resetForm = () => {
  formData.value = {
    propertyType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    surfaceArea: null,
    buildYear: null,
    timeline: '',
    additionalInfo: ''
  }
  errors.value = {}
}

// SEO
useHead({
  title: 'Energielabel Offerte Aanvragen - Jan Jansen bouwkundig Adviseurs',
  meta: [
    {
      name: 'description',
      content: 'Vraag eenvoudig een offerte aan voor uw energielabel. Snelle service door ISSO gecertificeerde EP-adviseur. Ontvang binnen 24 uur bericht.'
    }
  ]
})
</script>

<style scoped>
.p-invalid {
  border-color: #ef4444;
}

.p-error {
  color: #ef4444;
  display: block;
  margin-top: 0.25rem;
}
</style>
