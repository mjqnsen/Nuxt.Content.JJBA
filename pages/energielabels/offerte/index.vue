<template>
  <NuxtLayout>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold mb-4">Energielabel Offerte Aanvragen</h1>
        <p class="text-xl opacity-90">
          Vul onderstaand formulier in en ontvang binnen 1 werkdag een offerte op maat
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
            <!-- Error Message -->
            <Message 
              v-if="showError"
              severity="error" 
              :closable="true"
              class="inline-flex"
              @close="showError = false"
            >
              {{ errorMessage }}
            </Message>
            
            <form @submit.prevent="submitForm" class="p-6 space-y-8">
              <!-- Property Type Selection -->
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-foreground">Type Pand *</h3>
                <div class="w-full">
                  <SelectButton 
                    v-model="propertyType" 
                    :options="propertyTypes" 
                    optionLabel="label"
                    optionValue="value"
                    :multiple="false"
                    class="w-full flex-wrap justify-center"
                    :class="{ 'p-invalid': propertyTypeError }"
                  >
                    <template #option="{ option }">
                      <div class="flex flex-col items-center justify-center p-3 min-h-[100px] text-center">
                        <i :class="option.icon" class="text-2xl mb-2"></i>
                        <div class="font-medium text-sm">{{ option.label }}</div>
                        <div class="text-xs text-muted-foreground mt-1">{{ option.price }}</div>
                      </div>
                    </template>
                  </SelectButton>
                </div>
                <small v-if="propertyTypeError" class="p-error">{{ propertyTypeError }}</small>
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
                      v-model="firstName" 
                      class="w-full"
                      size="large"
                      :class="{ 'p-invalid': firstNameError }"
                    />
                    <small v-if="firstNameError" class="p-error">{{ firstNameError }}</small>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Achternaam *
                    </label>
                    <InputText 
                      v-model="lastName" 
                      class="w-full"
                      :class="{ 'p-invalid': lastNameError }"
                    />
                    <small v-if="lastNameError" class="p-error">{{ lastNameError }}</small>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      E-mailadres *
                    </label>
                    <InputText 
                      v-model="email" 
                      type="email"
                      class="w-full"
                      :class="{ 'p-invalid': emailError }"
                    />
                    <small v-if="emailError" class="p-error">{{ emailError }}</small>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Telefoonnummer *
                    </label>
                    <InputText 
                      v-model="phone" 
                      class="w-full"
                      :class="{ 'p-invalid': phoneError }"
                    />
                    <small v-if="phoneError" class="p-error">{{ phoneError }}</small>
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
                      v-model="address" 
                      class="w-full"
                      :class="{ 'p-invalid': addressError }"
                    />
                    <small v-if="addressError" class="p-error">{{ addressError }}</small>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Postcode *
                    </label>
                    <InputText 
                      v-model="postalCode" 
                      class="w-full"
                      :class="{ 'p-invalid': postalCodeError }"
                      placeholder="1234 AB"
                    />
                    <small v-if="postalCodeError" class="p-error">{{ postalCodeError }}</small>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">
                      Plaats *
                    </label>
                    <InputText 
                      v-model="city" 
                      class="w-full"
                      :class="{ 'p-invalid': cityError }"
                    />
                    <small v-if="cityError" class="p-error">{{ cityError }}</small>
                  </div>
                  <!-- <div v-if="showSurfaceArea">
                    <label class="block text-sm font-medium text-foreground mb-2">
                      {{ surfaceAreaLabel }}
                    </label>
                    <InputNumber 
                      v-model="surfaceArea" 
                      class="w-full"
                      suffix=" m²"
                      :min="0"
                    />
                  </div> -->
                </div>
                <!-- <div>
                  <label class="block text-sm font-medium text-foreground mb-2">
                    Bouwjaar (indien bekend)
                  </label>
                  <InputNumber 
                    v-model="buildYear" 
                    class="w-full"
                    :min="1800"
                    :max="new Date().getFullYear()"
                  />
                </div> -->
              </div>

              <!-- Timeline -->
              <!-- <Divider />
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-foreground">Wanneer heeft u het energielabel nodig?</h3>
                <div class="w-full">
                  <SelectButton 
                    v-model="timeline" 
                    :options="timelines" 
                    optionLabel="label"
                    optionValue="value"
                    :multiple="false"
                    class="w-full flex-wrap justify-center"
                  >
                    <template #option="{ option }">
                      <div class="flex flex-col items-center justify-center p-3 min-h-[80px] text-center">
                        <i :class="option.icon" class="text-xl mb-2"></i>
                        <div class="font-medium text-sm">{{ option.label }}</div>
                      </div>
                    </template>
                  </SelectButton>
                </div>
              </div> -->

              <!-- Building Plans -->
              <Divider />
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-foreground">Zijn er bouwtekeningen van het pand? *</h3>
                <div class="flex flex-wrap gap-4">
                  <div class="flex items-center">
                    <RadioButton v-model="hasBuildingPlans" inputId="plans-yes" value="ja" />
                    <label for="plans-yes" class="ml-2 cursor-pointer">Ja</label>
                  </div>
                  <div class="flex items-center">
                    <RadioButton v-model="hasBuildingPlans" inputId="plans-no" value="nee" />
                    <label for="plans-no" class="ml-2 cursor-pointer">Nee</label>
                  </div>
                  <!-- <div class="flex items-center">
                    <RadioButton v-model="hasBuildingPlans" inputId="plans-unknown" value="onbekend" />
                    <label for="plans-unknown" class="ml-2 cursor-pointer">Onbekend</label>
                  </div> -->
                </div>
                <small v-if="hasBuildingPlansError" class="p-error">{{ hasBuildingPlansError }}</small>
              </div>

              <!-- Additional Information -->
              <Divider />
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-foreground">Aanvullende informatie</h3>
                <Textarea 
                  v-model="additionalInfo" 
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
            href="mailto:f.vd.oord@janjansen.net" 
            label="f.vd.oord@janjansen.net"
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
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

// Zod validation schema
const validationSchema = toTypedSchema(
  z.object({
    propertyType: z.string().nullable().refine(val => val !== null && val.length > 0, 'Selecteer een type pand'),
    firstName: z.string().min(1, 'Voornaam is verplicht'),
    lastName: z.string().min(1, 'Achternaam is verplicht'),
    email: z.string()
      .min(1, 'E-mailadres is verplicht')
      .email('Ongeldig e-mailadres'),
    phone: z.string().min(1, 'Telefoonnummer is verplicht'),
    address: z.string().min(1, 'Adres is verplicht'),
    postalCode: z.string()
      .min(1, 'Postcode is verplicht')
      .regex(/^\d{4}\s?[A-Z]{2}$/i, 'Ongeldige postcode (bijv. 1234 AB)'),
    city: z.string().min(1, 'Plaats is verplicht'),
    surfaceArea: z.number().nullable().optional(),
    buildYear: z.number().nullable().optional(),
    timeline: z.string().nullable().optional(),
    hasBuildingPlans: z.string().min(1, 'Selecteer een optie'),
    additionalInfo: z.string().optional()
  })
)

// Form setup with VeeValidate
const { handleSubmit, resetForm: resetFormFields, setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    propertyType: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    surfaceArea: null,
    buildYear: null,
    timeline: null,
    hasBuildingPlans: '',
    additionalInfo: ''
  }
})

// Form fields using useField
const { value: propertyType, errorMessage: propertyTypeError } = useField('propertyType')
const { value: firstName, errorMessage: firstNameError } = useField('firstName')
const { value: lastName, errorMessage: lastNameError } = useField('lastName')
const { value: email, errorMessage: emailError } = useField('email')
const { value: phone, errorMessage: phoneError } = useField('phone')
const { value: address, errorMessage: addressError } = useField('address')
const { value: postalCode, errorMessage: postalCodeError } = useField('postalCode')
const { value: city, errorMessage: cityError } = useField('city')
const { value: surfaceArea } = useField('surfaceArea')
const { value: buildYear } = useField('buildYear')
const { value: timeline } = useField('timeline')
const { value: hasBuildingPlans, errorMessage: hasBuildingPlansError } = useField('hasBuildingPlans')
const { value: additionalInfo } = useField('additionalInfo')

const isSubmitting = ref(false)
const errorMessage = ref('')
const showError = ref(false)

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
    value: 'Vrijstaandhuis',
    label: 'Vrijstaandhuis',
    price: '€540,- incl. BTW',
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
  if (!propertyType.value) return false
  return propertyType.value.includes('utiliteit') || propertyType.value === 'villa'
})

const surfaceAreaLabel = computed(() => {
  if (!propertyType.value) return 'Gebruiks Oppervlakte (GBO)'
  if (propertyType.value.includes('utiliteit')) {
    return 'Bruto Vloer Oppervlakte (BVO) *'
  }
  return 'Gebruiks Oppervlakte (GBO)'
})

// Get property type from URL params
onMounted(() => {
  const route = useRoute()
  if (route.query.type) {
    setFieldValue('propertyType', route.query.type)
  }
})

// Form submission using VeeValidate
const submitForm = handleSubmit(async (values) => {
  isSubmitting.value = true
  
  try {
    // Prepare form data for Formspree
    const formData = new FormData()
    
    // Add all form fields to FormData
    formData.append('propertyType', values.propertyType || '')
    formData.append('firstName', values.firstName || '')
    formData.append('lastName', values.lastName || '')
    formData.append('email', values.email || '')
    formData.append('phone', values.phone || '')
    formData.append('address', values.address || '')
    formData.append('postalCode', values.postalCode || '')
    formData.append('city', values.city || '')
    // formData.append('surfaceArea', values.surfaceArea ? String(values.surfaceArea) : '')
    // formData.append('buildYear', values.buildYear ? String(values.buildYear) : '')
    // formData.append('timeline', values.timeline || '')
    formData.append('hasBuildingPlans', values.hasBuildingPlans || '')
    formData.append('additionalInfo', values.additionalInfo || '')
    
    // Add some metadata
    formData.append('_subject', 'Nieuwe Energielabel Offerte Aanvraag')
    formData.append('_replyto', values.email)
    formData.append('_format', 'plain')
    
    // Submit to Formspree
    const response = await fetch('https://formspree.io/f/xkgagwja', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    console.log('Form submitted successfully:', result)
    
    // Redirect to thank you page
    await navigateTo('/energielabels/offerte/bedankt')
  } catch (error) {
    console.error('Error submitting form:', error)
    errorMessage.value = 'Er ging iets mis bij het versturen van uw aanvraag. Probeer het opnieuw of neem direct contact op.'
    showError.value = true
    
    // Scroll to top to show the error message
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    isSubmitting.value = false
  }
})

// Reset form using VeeValidate
const resetForm = () => {
  resetFormFields()
}

// SEO
useHead({
  title: 'Energielabel Offerte Aanvragen - Jan Jansen bouwkundig adviseurs',
  meta: [
    {
      name: 'description',
      content: 'Vraag eenvoudig een offerte aan voor uw energielabel. Snelle service door RVO gecertificeerde EP-adviseur. Ontvang binnen 1 werkdag bericht.'
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

/* Make SelectButton components wrap */
:deep(.p-selectbutton) {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

:deep(.p-selectbutton .p-button) {
  flex: 1 1 auto;
  min-width: 150px;
}

@media (max-width: 768px) {
  :deep(.p-selectbutton .p-button) {
    flex: 1 1 100%;
    min-width: 100%;
    margin-bottom: 0.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  :deep(.p-selectbutton .p-button) {
    flex: 1 1 calc(50% - 0.25rem);
    min-width: calc(50% - 0.25rem);
  }
}
</style>
