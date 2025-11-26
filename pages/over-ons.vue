<template>
  <NuxtLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="doc">
        <!-- Hero Section -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Over Ons - Jan Jansen bouwkundig adviseurs
          </h1>
            <div class="text-xl md:text-2xl text-primary font-semibold mb-8">
              Tekenwerk, Rekenwerk, Goed Bekeken Werk
            </div>
          </div>

          <!-- Team Members Section -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <!-- Team Member Card - Jan Jansen -->
            <Card class="h-fit">
              <template #header>
                <img 
                  src="/images/about/jan-jansen.jpg" 
                  alt="Jan Jansen" 
                  class="w-full h-64 object-cover object-[50%_40%]"
                />
              </template>
              <template #content>
                <div class="p-6">
                  <h2 class="text-2xl font-semibold text-foreground mb-2">Jan Jansen</h2>
                  <Badge 
                    value="Oprichter & Bouwkundig Adviseur" 
                    severity="info" 
                    class="mb-4"
                  />
                  <p class="text-muted-foreground leading-relaxed mb-4">
                    Jan Jansen is de oprichter van Jan Jansen bouwkundig adviseurs. Met jarenlange ervaring in de bouwsector levert hij kwalitatief hoogstaand teken- en rekenwerk voor diverse bouwprojecten.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <Tag value="Tekenwerk" />
                    <Tag value="Rekenwerk" />
                    <Tag value="Projectbegeleiding" />
                  </div>
                </div>
              </template>
            </Card>

            <!-- Team Member Card - Ferdinand -->
            <Card class="h-fit">
              <template #header>
                <img 
                  src="/images/about/ferdinand.jpg" 
                  alt="Ferdinand van den Oord" 
                  class="w-full h-64 object-cover object-[50%_30%]"
                />
              </template>
              <template #content>
                <div class="p-6">
                  <h2 class="text-2xl font-semibold text-foreground mb-2">Ferdinand van den Oord</h2>
                  <Badge 
                    value="RVO gecertificeerd EP-adviseur" 
                    severity="success" 
                    class="mb-4"
                  />
                  <p class="text-muted-foreground leading-relaxed mb-4">
                    Ferdinand van den Oord is RVO gecertificeerd EP-adviseur woningbouw, utiliteitsbouw en detailopnamen. Hij verzorgt de zogenaamde Energie Prestatie Labels.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <Tag value="Woningbouw" />
                    <Tag value="Utiliteitsbouw" />
                    <Tag value="EP Labels" />
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <!-- Company Description Card -->
            <Card class="h-fit">
              <template #header>
                <img 
                  src="/images/about/officebuilding.jpg" 
                  alt="Kantoorgebouw Westerpoort" 
                  class="w-full h-64 object-cover"
                />
              </template>
              <template #content>
                <div class="p-6">
                  <h2 class="text-2xl font-semibold text-foreground mb-4">Ons Bedrijf</h2>
                  <p class="text-muted-foreground leading-relaxed mb-4">
                    Jan Jansen bouwkundig adviseurs is een gespecialiseerd bureau dat zich richt op kwalitatief hoogstaand teken- en rekenwerk. Wij combineren vakmanschap met innovatieve oplossingen en richten ons steeds meer op de groeiende markt van duurzaamheidsvraagstukken in de bouw.
                  </p>
                  <Chip 
                    label="Duurzaamheid" 
                    icon="pi pi-sun" 
                    class="mr-2"
                  />
                  <Chip 
                    label="Innovatie" 
                    icon="pi pi-lightbulb"
                  />
                </div>
              </template>
            </Card>

            <!-- Additional Team Info Card -->
            <Card class="h-fit">
              <template #content>
                <div class="p-6 text-center">
                  <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="pi pi-users text-primary text-2xl"></i>
                  </div>
                  <h3 class="text-xl font-semibold text-foreground mb-3">Ons Team</h3>
                  <p class="text-muted-foreground leading-relaxed mb-4">
                    Samen vormen wij een ervaren team dat zich inzet voor kwaliteit en duurzaamheid in elk project. Van concept tot realisatie staan wij voor u klaar.
                  </p>
                  <div class="space-y-2 text-sm text-muted-foreground">
                    <div class="flex items-center justify-center gap-2">
                      <i class="pi pi-check-circle text-primary"></i>
                      <span>Ervaren professionals</span>
                    </div>
                    <div class="flex items-center justify-center gap-2">
                      <i class="pi pi-check-circle text-primary"></i>
                      <span>Persoonlijke benadering</span>
                    </div>
                    <div class="flex items-center justify-center gap-2">
                      <i class="pi pi-check-circle text-primary"></i>
                      <span>Kwaliteitsgarantie</span>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <!-- Office Location Section -->
          <Card class="mb-12">
            <template #header>
              <div class="relative">
                <img 
                  src="/images/about/workspace.jpg" 
                  alt="Moderne werkruimte" 
                  class="w-full h-80 object-cover"
                />
                <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h2 class="text-3xl font-bold text-white text-center">
                    Onze Vestiging
                  </h2>
                </div>
              </div>
            </template>
            <template #content>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 class="text-xl font-semibold text-foreground mb-3">Kantoorgebouw Westerpoort</h3>
                    <p class="text-muted-foreground leading-relaxed mb-4">
                      De nieuwe vestiging bevindt zich in kantoorgebouw Westerpoort, een lichte moderne werkruimte.
                    </p>
                    <div class="flex items-center gap-2 text-muted-foreground mb-2">
                      <i class="pi pi-map-marker text-primary"></i>
                      <span>Westervoort, Nederland</span>
                    </div>
                    <div class="flex items-center gap-2 text-muted-foreground">
                      <i class="pi pi-building text-primary"></i>
                      <span>Modern kantoorgebouw</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <!-- Services Section -->
          <ServicesSection />

          <!-- Call to Action Section -->
          <Card class="border-2 border-primary/20 bg-surface-0">
            <template #content>
              <div class="p-8 text-center">
                <h2 class="text-2xl font-bold text-surface-900 mb-4">Contact Opnemen</h2>
                <p class="text-surface-600 mb-6 max-w-2xl mx-auto">
                  Heeft u vragen over onze diensten of wilt u een project bespreken? 
                  Neem direct contact met ons op voor een vrijblijvend gesprek over uw bouwkundige uitdagingen.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    as="a" 
                    href="/contact" 
                    label="Neem Contact Op"
                    icon="pi pi-envelope"
                    size="large"
                    class="px-6 py-3"
                  />
                  <Button 
                    as="a" 
                    href="tel:0263115990" 
                    label="Bel Direct: 026 311 5990"
                    icon="pi pi-phone"
                    severity="secondary"
                    outlined
                    size="large"
                    class="px-6 py-3"
                  />
                </div>
              </div>
            </template>
          </Card>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Fetch the about content using the new v3 API
const { data: doc } = await useAsyncData('over-ons', () => 
  queryCollection('content').path('/over-ons').first()
)

useHead({
  title: 'Over Ons - Jan Jansen bouwkundig adviseurs',
  meta: [
    {
      name: 'description',
      content: 'Tekenwerk, rekenwerk, goed bekeken werk. Jan Jansen bouwkundig adviseurs met RVO gecertificeerd EP-adviseur Ferdinand van den Oord. Gevestigd in Westerpoort.'
    }
  ]
})
</script>
