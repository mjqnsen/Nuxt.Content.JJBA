<template>
  <NuxtLayout>
    <div>
      <!-- Hero Section -->
       <section class="relative bg-gradient-to-br from-orange-600 to-orange-500 text-white overflow-hidden" style="background: linear-gradient(to bottom right, rgb(236, 88, 39), rgb(189, 120, 82))">
      <div class="absolute inset-0 bg-black/30"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Rekenwerken, Tekenwerk, Goed bekeken werk
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
            Jan Jansen bouwkundig adviseurs combineert innovatief ontwerp met duurzame praktijken om ruimtes te creëren die inspireren en blijvend zijn.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Button 
              as="a" 
              href="/over-ons"
              label="Meer Over Ons"
              size="large"
              class="px-8 py-3"
            />
            <Button 
              as="a" 
              href="/contact" 
              label="Start Uw Project"
              severity="secondary"
              size="large"
              class="px-8 py-3"
            />
          </div>
        </div>
      </div>
    </section>


    <!-- Services Section -->
    <ServicesSection 
      background-color="py-16 bg-background"
    />

    <!-- Energielabels Section -->
    <section class="py-16 bg-gradient-to-br from-primary/10 to-primary/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Content -->
          <Card class="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <template #content>
              <div class="p-8">
                <div class="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <i class="pi pi-lightning-bolt"></i>
                  <span>Energielabels</span>
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Energielabel nodig voor uw woning of bedrijfspand?
                </h2>
                <p class="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Samen kunnen we ervoor zorgen dat uw woning of bedrijfspand voorzien wordt van een 
                  <strong>officieel energielabel</strong>. Ferdinand van den Oord is RVO gecertificeerd 
                  EP-adviseur en zorgt voor snelle, betrouwbare service.
                </p>
                
                <!-- Features -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <i class="pi pi-check text-primary"></i>
                    </div>
                    <div>
                      <h4 class="font-semibold text-foreground">RVO gecertificeerd EP-adviseur</h4>
                      <p class="text-sm text-muted-foreground">Ferdinand van den Oord</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <i class="pi pi-clock text-primary"></i>
                    </div>
                    <div>
                      <h4 class="font-semibold text-foreground">Binnen 5 werkdagen</h4>
                      <p class="text-sm text-muted-foreground">Gegarandeerde levering</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <i class="pi pi-home text-primary"></i>
                    </div>
                    <div>
                      <h4 class="font-semibold text-foreground">Alle woningtypes</h4>
                      <p class="text-sm text-muted-foreground">Vanaf €420,- incl. BTW</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <i class="pi pi-building text-primary"></i>
                    </div>
                    <div>
                      <h4 class="font-semibold text-foreground">Utiliteitsgebouwen</h4>
                      <p class="text-sm text-muted-foreground">Vanaf €595,- excl. BTW</p>
                    </div>
                  </div>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-4">
                  <Button 
                    as="a" 
                    href="/energielabels"
                    label="Bekijk de Mogelijkheden"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    size="large"
                    class="px-8 py-3"
                  />
                  <Button 
                    as="a" 
                    href="/energielabels/offerte"
                    label="Direct Offerte Aanvragen"
                    severity="secondary"
                    icon="pi pi-calculator"
                    iconPos="right"
                    size="large"
                    class="px-8 py-3"
                  />
                </div>
              </div>
            </template>
          </Card>

          <!-- Visual/Stats -->
          <div class="relative">
            <!-- Energy Label Visual -->
            <div class="bg-white rounded-xl shadow-lg p-8 border border-primary/20">
              <div class="text-center mb-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Energielabels</h3>
                <p class="text-gray-600 text-sm">Van A++++ (zeer zuinig) tot G (minst zuinig)</p>
              </div>
              
              <!-- Energy Label Scale -->
              <div class="space-y-2">
                <div class="flex items-center gap-3">
                  <div class="w-16 h-8 bg-green-700 rounded flex items-center justify-center text-white font-bold text-xs">A++++</div>
                  <div class="text-sm text-gray-800">0 op de meter woning</div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-16 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-xs">A+++</div>
                  <div class="text-sm text-gray-800">Zeer zuinig</div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-16 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">A++</div>
                  <div class="text-sm text-gray-800">Zeer zuinig</div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-16 h-8 bg-green-400 rounded flex items-center justify-center text-white font-bold text-sm">A+</div>
                  <div class="text-sm text-gray-800">Zuinig</div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-16 h-8 bg-green-300 rounded flex items-center justify-center text-white font-bold text-sm">A</div>
                  <div class="text-sm text-gray-800">Zuinig</div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-16 h-8 bg-yellow-400 rounded flex items-center justify-center text-white font-bold text-sm">B</div>
                  <div class="text-sm text-gray-800">Redelijk zuinig</div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-16 h-8 bg-orange-400 rounded flex items-center justify-center text-white font-bold text-sm">C</div>
                  <div class="text-sm text-gray-800">Matig zuinig</div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-16 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-sm">D</div>
                  <div class="text-sm text-gray-800">Weinig zuinig</div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-16 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-sm">E</div>
                  <div class="text-sm text-gray-800">Niet zuinig</div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-16 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-sm">F</div>
                  <div class="text-sm text-gray-800">Niet zuinig</div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-16 h-8 bg-red-700 rounded flex items-center justify-center text-white font-bold text-sm">G</div>
                  <div class="text-sm text-gray-800">Minst zuinig</div>
                </div>
              </div>

              <!-- Quick Stats -->
              <!-- <div class="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div class="text-center">
                  <div class="text-2xl font-bold text-orange-600">500+</div>
                  <div class="text-sm text-gray-600">Energielabels afgegeven</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-orange-600">5★</div>
                  <div class="text-sm text-gray-600">Gemiddelde beoordeling</div>
                </div>
              </div> -->
            </div>

            <!-- Floating Badge -->
            <div class="absolute -top-3 -right-3">
              <Badge 
                value="RVO Erkend" 
                severity="success" 
                class="text-sm font-semibold shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent News Section -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-foreground mb-4">Laatste Nieuws en Projecten</h2>
            <p class="text-lg text-muted-foreground">
              Blijf op de hoogte van onze recente projecten en bedrijfsnieuws
            </p>
          </div>
          <Button 
            as="a" 
            href="/nieuws/page-1" 
            label="Alles bekijken"
            severity="secondary"
            outlined
            icon="pi pi-arrow-right"
            iconPos="right"
            class="hidden sm:flex"
          />
        </div>
        
        <div v-if="recentNews && recentNews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <NewsCard 
            v-for="article in recentNews" 
            :key="article._path" 
            :article="article"
          />
        </div>
        
        <div v-else class="text-center py-12">
          <div class="flex flex-col items-center gap-4">
            <i class="pi pi-inbox text-4xl text-muted-foreground"></i>
            <p class="text-muted-foreground">Geen recent nieuws beschikbaar</p>
          </div>
        </div>
        
        <!-- Mobile View All Button -->
        <div class="text-center mt-8 sm:hidden">
          <Button 
            as="a" 
            href="/nieuws/page-1" 
            label="Alles bekijken"
            severity="secondary"
            outlined
            icon="pi pi-arrow-right"
            iconPos="right"
          />
        </div>
      </div>
    </section>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Define layout
definePageMeta({
  layout: 'default'
})

// Fetch recent news articles
const recentNews = await queryCollection('nieuws')
  .order('date', 'DESC')
  .limit(3)
  .all()

useHead({
  title: 'Jan Jansen bouwkundig adviseurs - De Ruimtes van Morgen Ontwerpen Vandaag',
  meta: [
    {
      name: 'description',
      content: 'Jan Jansen bouwkundig adviseurs combineert innovatief ontwerp met duurzame praktijken om uitzonderlijke woon- en commerciële ruimtes te creëren.'
    }
  ]
})
</script>


