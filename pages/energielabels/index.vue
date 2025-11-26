<template>
  <NuxtLayout>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-orange-600 to-orange-500 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Energielabels voor Woningen & Bedrijfspanden
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Gecertificeerd EP-adviseur Ferdinand van den Oord - Snelle levering binnen 5 werkdagen
          </p>
        </div>
        
        <!-- Quick Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
            <i class="pi pi-home text-3xl mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">Woningbouw</h3>
            <p class="text-lg font-bold">Vanaf €420,-</p>
            <p class="text-sm opacity-90">Appartementen, rijtjeshuizen, vrijstaande woningen</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
            <i class="pi pi-building text-3xl mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">Utiliteit</h3>
            <p class="text-lg font-bold">Vanaf €595,-</p>
            <p class="text-sm opacity-90">Kantoren, winkels, bedrijfspanden</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
            <i class="pi pi-cog text-3xl mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">Maatwerk</h3>
            <p class="text-lg font-bold">Op maat</p>
            <p class="text-sm opacity-90">0-meting & verbeteradvies</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction Section -->
    <section class="py-16 bg-background">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-foreground mb-6">
          Bent u van plan uw woning of bedrijfspand te verkopen/verhuren?
        </h2>
        <p class="text-lg text-muted-foreground leading-relaxed">
          Heeft u binnenkort plannen om uw pand te verkopen/verhuren of wilt u een 
          <strong>maatwerkadvies</strong> voor een beter energielabel? Neem vrijblijvend contact op om 
          de mogelijkheden te bespreken.
        </p>
      </div>
    </section>

    <!-- Woningbouw Services -->
    <section class="py-16 bg-muted/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-4">Woningbouw Energielabels</h2>
          <p class="text-lg text-muted-foreground">
            Gecertificeerde energielabels voor alle woningtypes
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Appartement Card -->
          <Card class="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <template #header>
              <div class="bg-gradient-to-r from-primary/10 to-primary/5 p-6 text-center">
                <i class="pi pi-home text-primary text-4xl mb-4"></i>
                <h3 class="text-2xl font-semibold text-foreground mb-2">Appartement</h3>
                <div class="text-3xl font-bold text-primary">€420,-</div>
                <p class="text-sm text-muted-foreground">Woningbouw basis incl. BTW</p>
              </div>
            </template>
            <template #content>
              <div class="p-6">
                <ul class="space-y-3 mb-6 text-muted-foreground">
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Energielabel (RVO) met energiebesparende maatregelen</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Uitgebreide rapportage</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Woningbezoek ca. 30-45 minuten</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Woning tot 140 m² (GBO)</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Levering binnen 5 werkdagen</span>
                  </li>
                </ul>
                <Button 
                  as="a" 
                  href="/energielabels/offerte?type=appartement" 
                  label="Offerte Aanvragen"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  class="w-full"
                />
              </div>
            </template>
          </Card>

          <!-- Rij/Hoekwoning Card -->
          <Card class="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <template #header>
              <div class="bg-gradient-to-r from-primary/10 to-primary/5 p-6 text-center">
                <i class="pi pi-home text-primary text-4xl mb-4"></i>
                <h3 class="text-2xl font-semibold text-foreground mb-2">Rij/Hoekwoning</h3>
                <div class="text-3xl font-bold text-primary">€450,-</div>
                <p class="text-sm text-muted-foreground">Woningbouw basis incl. BTW</p>
              </div>
            </template>
            <template #content>
              <div class="p-6">
                <ul class="space-y-3 mb-6 text-muted-foreground">
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Energielabel (RVO) met energiebesparende maatregelen</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Uitgebreide rapportage</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Woningbezoek ca. 45-60 minuten</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Woning tot 160 m² (GBO)</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Levering binnen 5 werkdagen</span>
                  </li>
                </ul>
                <Button 
                  as="a" 
                  href="/energielabels/offerte?type=rijtjeshuis" 
                  label="Offerte Aanvragen"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  class="w-full"
                />
              </div>
            </template>
          </Card>

          <!-- Villa Card -->
          <Card class="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <template #header>
              <div class="bg-gradient-to-r from-primary/10 to-primary/5 p-6 text-center">
                <i class="pi pi-home text-primary text-4xl mb-4"></i>
                <h3 class="text-2xl font-semibold text-foreground mb-2">Vrijstaande woning</h3>
                <div class="text-3xl font-bold text-primary">€540,-</div>
                <p class="text-sm text-muted-foreground">Woningbouw basis incl. BTW</p>
              </div>
            </template>
            <template #content>
              <div class="p-6">
                <ul class="space-y-3 mb-6 text-muted-foreground">
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Energielabel (RVO) met energiebesparende maatregelen</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Uitgebreide rapportage</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Woningbezoek ca. 60-90 minuten</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Woning boven 160 m² (GBO)</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle text-primary text-sm"></i>
                    <span>Levering binnen 5 werkdagen</span>
                  </li>
                </ul>
                <Button 
                  as="a" 
                  href="/energielabels/offerte?type=vrijstaand" 
                  label="Offerte Aanvragen"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  class="w-full"
                />
              </div>
            </template>
          </Card>
        </div>

        <!-- Pricing Note -->
        <div class="mt-8 text-center">
          <p class="text-sm text-muted-foreground">
            * Prijzen woningbouw basis incl. BTW, exclusief reiskosten
          </p>
        </div>
      </div>
    </section>

    <!-- Utiliteit Services -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-4">Utiliteit Energielabels</h2>
          <p class="text-lg text-muted-foreground">
            Energielabels voor bedrijfspanden en commerciële ruimtes
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Utiliteit Cards -->
          <Card class="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <template #content>
              <div class="p-6 text-center">
                <i class="pi pi-building text-primary text-4xl mb-4"></i>
                <h3 class="text-xl font-semibold text-foreground mb-2">BVO tot 150 m²</h3>
                <div class="text-2xl font-bold text-primary mb-4">€595,-</div>
                <p class="text-sm text-muted-foreground mb-6">Basis excl. BTW en reiskosten</p>
                <Button 
                  as="a" 
                  href="/energielabels/offerte?type=utiliteit-150" 
                  label="Neem contact op"
                  class="w-full"
                />
              </div>
            </template>
          </Card>

          <Card class="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <template #content>
              <div class="p-6 text-center">
                <i class="pi pi-building text-primary text-4xl mb-4"></i>
                <h3 class="text-xl font-semibold text-foreground mb-2">BVO tot 400 m²</h3>
                <div class="text-2xl font-bold text-primary mb-4">€795,-</div>
                <p class="text-sm text-muted-foreground mb-6">Basis excl. BTW en reiskosten</p>
                <Button 
                  as="a" 
                  href="/energielabels/offerte?type=utiliteit-400" 
                  label="Neem contact op"
                  class="w-full"
                />
              </div>
            </template>
          </Card>

          <Card class="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <template #content>
              <div class="p-6 text-center">
                <i class="pi pi-building text-primary text-4xl mb-4"></i>
                <h3 class="text-xl font-semibold text-foreground mb-2">BVO boven 400 m²</h3>
                <div class="text-2xl font-bold text-primary mb-4">In overleg</div>
                <p class="text-sm text-muted-foreground mb-6">Basis excl. BTW en reiskosten</p>
                <Button 
                  as="a" 
                  href="/energielabels/offerte?type=utiliteit-groot" 
                  label="Neem contact op"
                  class="w-full"
                />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Maatwerkadvies -->
    <section class="py-16 bg-muted/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card class="border-2 border-primary/20 hover:border-primary/40 transition-colors">
          <template #header>
            <div class="bg-gradient-to-r from-primary to-primary/80 text-white p-8 text-center">
              <i class="pi pi-cog text-5xl mb-4"></i>
              <h2 class="text-3xl font-bold mb-2">Maatwerkadvies</h2>
              <p class="text-lg opacity-90">
                Uitgebreid advies voor optimaal energielabel
              </p>
            </div>
          </template>
          <template #content>
            <div class="p-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 class="text-xl font-semibold text-foreground mb-4">Wat krijgt u?</h3>
                  <ul class="space-y-2 text-muted-foreground">
                    <li class="flex items-center gap-2">
                      <i class="pi pi-check-circle text-primary"></i>
                      <span>0-meting van uw pand</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <i class="pi pi-check-circle text-primary"></i>
                      <span>Verbetermaatregelen rapport</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <i class="pi pi-check-circle text-primary"></i>
                      <span>Terugverdientijd berekening</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <i class="pi pi-check-circle text-primary"></i>
                      <span>Investering vs. opbrengst analyse</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <i class="pi pi-check-circle text-primary"></i>
                      <span>Verbeterd energielabel</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-foreground mb-4">Prijzen</h3>
                  <div class="bg-muted/50 p-4 rounded-lg">
                    <p class="text-lg font-semibold text-foreground">Prijzen in overleg</p>
                    <p class="text-muted-foreground">
                      Afhankelijk van de omvang en complexiteit van uw pand
                    </p>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <Button 
                  as="a" 
                  href="/energielabels/offerte?type=maatwerk" 
                  label="Neem contact op voor maatwerk"
                  icon="pi pi-envelope"
                  size="large"
                  class="px-8"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <!-- Process Flow -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-4">Hoe werkt het?</h2>
          <p class="text-lg text-muted-foreground">
            Eenvoudig en snel proces voor uw energielabel
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 class="text-lg font-semibold text-foreground mb-2">Offerte Aanvragen</h3>
            <p class="text-muted-foreground">
              Vul het formulier in met uw pand gegevens
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 class="text-lg font-semibold text-foreground mb-2">Afspraak Plannen</h3>
            <p class="text-muted-foreground">
              Wij nemen contact op voor het inplannen van het bezoek
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 class="text-lg font-semibold text-foreground mb-2">Woningbezoek</h3>
            <p class="text-muted-foreground">
              Ferdinand voert de energielabel opname uit
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              4
            </div>
            <h3 class="text-lg font-semibold text-foreground mb-2">Energielabel</h3>
            <p class="text-muted-foreground">
              Ontvang uw officiële energielabel binnen 5 werkdagen
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Signals -->
    <section class="py-16 bg-muted/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <Badge value="Gecertificeerd EP-adviseur" severity="success" class="mb-4" />
            <h4 class="font-semibold text-foreground">Ferdinand van den Oord</h4>
            <p class="text-muted-foreground">EP-adviseur woningbouw & utiliteit</p>
          </div>
          <div class="text-center">
            <i class="pi pi-clock text-primary text-3xl mb-4"></i>
            <h4 class="font-semibold text-foreground">5 Werkdagen</h4>
            <p class="text-muted-foreground">Gegarandeerde snelle levering</p>
          </div>
          <div class="text-center">
            <i class="pi pi-shield text-primary text-3xl mb-4"></i>
            <h4 class="font-semibold text-foreground">RVO Erkend</h4>
            <p class="text-muted-foreground">Officiële energielabels</p>
          </div>
          <div class="text-center">
            <i class="pi pi-phone text-primary text-3xl mb-4"></i>
            <h4 class="font-semibold text-foreground">Persoonlijk Contact</h4>
            <p class="text-muted-foreground">Direct bereikbaar voor vragen</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">
          Klaar voor uw energielabel?
        </h2>
        <p class="text-xl mb-8 opacity-90">
          Vraag vandaag nog een vrijblijvende offerte aan en ontvang binnen 24 uur bericht
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            as="a" 
            href="/energielabels/offerte" 
            label="Offerte Aanvragen"
            severity="primary"
            size="large"
            icon="pi pi-arrow-right"
            iconPos="right"
            class="px-8"
          />
          <Button 
            as="a" 
            href="tel:0263115990" 
            label="Bel Direct: 026 311 5990"
            severity="secondary"
            size="large"
            icon="pi pi-phone"
            class="px-8"
          />
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: 'Energielabels - Jan Jansen bouwkundig adviseurs',
  meta: [
    {
      name: 'description',
      content: 'Officiële energielabels voor woningen en bedrijfspanden door gecertificeerd EP-adviseur. Snelle levering binnen 5 werkdagen. Vanaf €420,- incl. BTW.'
    },
    {
      name: 'keywords',
      content: 'energielabel, woningbouw, utiliteit, EP-adviseur, RVO, Westervoort'
    }
  ]
})
</script>
