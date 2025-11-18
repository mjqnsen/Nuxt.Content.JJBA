<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <!-- Contact Information -->
      <div>
        <ContentDoc>
          <template #default="{ doc }">
            <div class="prose prose-lg max-w-none">
              <h1 class="text-4xl font-bold text-foreground mb-6">{{ doc.title }}</h1>
              
              <div class="bg-muted/50 p-6 rounded-lg mb-8">
                <h2 class="text-2xl font-semibold text-foreground mb-4">Neem contact op</h2>
                <p class="text-muted-foreground mb-4">
                  U kunt ons bereiken via ons telefoonnummer of schrijf ons een mailtje. We nemen zo spoedig mogelijk contact met u op.
                </p>
                <p class="text-muted-foreground">
                  U bent uiteraard ook welkom bij ons op kantoor. Doen we gelijk een bakje koffie.
                </p>
              </div>

              <!-- Contact Details Cards -->
              <div class="space-y-4">
                <Card class="p-6">
                  <template #content>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: rgb(236, 88, 39)">
                        <i class="pi pi-phone text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 class="font-semibold text-foreground">Telefoon</h3>
                        <a href="tel:0263115990" class="text-primary hover:underline">026 311 5990</a>
                      </div>
                    </div>
                  </template>
                </Card>

                <Card class="p-6">
                  <template #content>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: rgb(236, 88, 39)">
                        <i class="pi pi-map-marker text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 class="font-semibold text-foreground">Adres</h3>
                        <p class="text-muted-foreground">Het Vergun 26b<br>6931 KD Westervoort</p>
                      </div>
                    </div>
                  </template>
                </Card>

                <Card class="p-6">
                  <template #content>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: rgb(236, 88, 39)">
                        <i class="pi pi-envelope text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 class="font-semibold text-foreground">Email</h3>
                        <a href="mailto:info@janjansen.net" class="text-primary hover:underline">info@janjansen.net</a>
                      </div>
                    </div>
                  </template>
                </Card>

                <Card class="p-6">
                  <template #content>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <i class="pi pi-clock text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 class="font-semibold text-foreground">Openingstijden</h3>
                        <div class="text-muted-foreground">
                          <p>Maandag - Vrijdag: 9:00 - 18:00</p>
                          <p>Zaterdag: 10:00 - 16:00</p>
                          <p>Zondag: Gesloten</p>
                        </div>
                      </div>
                    </div>
                  </template>
                </Card>
              </div>

              <!-- Call to Action -->
              <div class="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
                <h3 class="text-xl font-semibold text-foreground mb-3">Klaar om te beginnen?</h3>
                <p class="text-muted-foreground mb-4">
                  Neem vandaag nog contact met ons op om uw architecturale visie te bespreken.
                </p>
                <div class="flex flex-col sm:flex-row gap-3">
                  <Button 
                    as="a" 
                    href="tel:0263115990"
                    label="Bel Nu"
                    icon="pi pi-phone"
                    class="flex-1"
                  />
                  <Button 
                    as="a" 
                    href="mailto:info@janjansen.net"
                    label="Stuur Email"
                    severity="secondary"
                    outlined
                    icon="pi pi-envelope"
                    class="flex-1"
                  />
                </div>
              </div>
            </div>
          </template>
        </ContentDoc>
      </div>

      <!-- Office Building Image -->
      <div class="lg:sticky lg:top-8">
        <Card class="overflow-hidden">
          <template #header>
            <div class="relative">
              <AppImage 
                src="/images/office-building.jpg"
                alt="Zenith Architectuur kantoorgebouw"
                class="w-full h-80 lg:h-96 object-cover"
                fallback="/images/news/Placeholder.svg"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-lg font-semibold">Ons Kantoor</h3>
                <p class="text-sm opacity-90">Het Vergun 26b, Westervoort</p>
              </div>
            </div>
          </template>
          <template #content>
            <div class="p-6">
              <h4 class="font-semibold text-foreground mb-3">Bezoek Ons Kantoor</h4>
              <p class="text-muted-foreground mb-4">
                Kom langs voor een persoonlijk gesprek over uw project. We ontvangen u graag met een kopje koffie.
              </p>
              <Button 
                as="a"
                href="https://maps.google.com/?q=Het+Vergun+26b,+6931+KD+Westervoort"
                target="_blank"
                label="Bekijk op Kaart"
                severity="secondary"
                outlined
                icon="pi pi-map"
                size="small"
                class="w-full"
              />
            </div>
          </template>
        </Card>

        <!-- Additional Info Card -->
        <Card class="mt-6">
          <template #content>
            <div class="p-6 text-center">
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-users text-primary text-2xl"></i>
              </div>
              <h4 class="font-semibold text-foreground mb-2">Persoonlijke Benadering</h4>
              <p class="text-muted-foreground text-sm">
                Bij Jan Jansen bouwkundig Adviseurs staat persoonlijk contact centraal. Elk project krijgt onze volledige aandacht.
              </p>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact - Jan Jansen bouwkundig Adviseurs',
  meta: [
    {
      name: 'description',
      content: 'Neem contact op met Jan Jansen bouwkundig Adviseurs voor uw volgende project. Contactinformatie en aanvraagformulier.'
    }
  ]
})
</script>
