<template>
  <NuxtLayout>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="mb-6">
          <i class="pi pi-check-circle text-6xl opacity-90"></i>
        </div>
        <h1 class="text-4xl font-bold mb-4">Bedankt voor uw aanvraag!</h1>
        <p class="text-xl opacity-90">
          We hebben uw offerte aanvraag succesvol ontvangen
        </p>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-16 bg-background">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <template #content>
            <div class="p-8 text-center">
              <h2 class="text-2xl font-semibold text-foreground mb-6">
                Wat gebeurt er nu?
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <!-- Step 1 -->
                <div class="text-center">
                  <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="pi pi-envelope text-2xl text-primary"></i>
                  </div>
                  <h3 class="font-semibold text-foreground mb-2">1. Bevestiging</h3>
                  <p class="text-muted-foreground text-sm">
                    U ontvangt binnen 15 minuten een bevestiging per e-mail
                  </p>
                </div>

                <!-- Step 2 -->
                <div class="text-center">
                  <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="pi pi-calculator text-2xl text-primary"></i>
                  </div>
                  <h3 class="font-semibold text-foreground mb-2">2. Offerte</h3>
                  <p class="text-muted-foreground text-sm">
                    Binnen 24 uur ontvangt u een gedetailleerde offerte
                  </p>
                </div>

                <!-- Step 3 -->
                <div class="text-center">
                  <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="pi pi-phone text-2xl text-primary"></i>
                  </div>
                  <h3 class="font-semibold text-foreground mb-2">3. Contact</h3>
                  <p class="text-muted-foreground text-sm">
                    Wij nemen contact met u op om de details door te spreken
                  </p>
                </div>
              </div>

              <Divider />

              <div class="mt-8">
                <h3 class="text-xl font-semibold text-foreground mb-4">
                  Vragen in de tussentijd?
                </h3>
                <p class="text-muted-foreground mb-6">
                  Neem gerust direct contact met ons op. We helpen u graag verder!
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    as="a"
                    to="/energielabels"
                    label="Terug naar Energielabels"
                    icon="pi pi-arrow-left"
                    severity="secondary"
                    outlined
                  />
                  <Button 
                    as="a"
                    to="/"
                    label="Naar Homepage"
                    icon="pi pi-home"
                  />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <!-- Additional Info Section -->
    <section class="py-12 bg-muted/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 class="text-xl font-semibold text-foreground mb-4">
          Waarom Jan Jansen bouwkundig adviseurs?
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <i class="pi pi-verified text-3xl text-primary mb-2"></i>
            <h4 class="font-medium text-foreground mb-2">ISSO Gecertificeerd</h4>
            <p class="text-sm text-muted-foreground">
              Officieel erkende EP-adviseur
            </p>
          </div>
          <div class="text-center">
            <i class="pi pi-clock text-3xl text-primary mb-2"></i>
            <h4 class="font-medium text-foreground mb-2">Snelle Service</h4>
            <p class="text-sm text-muted-foreground">
              Binnen 24 uur een offerte
            </p>
          </div>
          <div class="text-center">
            <i class="pi pi-users text-3xl text-primary mb-2"></i>
            <h4 class="font-medium text-foreground mb-2">Ervaren Team</h4>
            <p class="text-sm text-muted-foreground">
              Meer dan 15 jaar ervaring
            </p>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
// SEO
useHead({
  title: 'Bedankt voor uw aanvraag - Jan Jansen bouwkundig adviseurs',
  meta: [
    {
      name: 'description',
      content: 'Bedankt voor uw energielabel offerte aanvraag. We nemen binnen 24 uur contact met u op met een gedetailleerde offerte.'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

// Prevent direct access without coming from form submission
onMounted(() => {
  // Optional: Add logic to redirect if user didn't come from form
  // This could be done by checking sessionStorage or a query parameter
})
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
