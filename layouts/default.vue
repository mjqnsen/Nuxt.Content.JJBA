<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-card shadow-lg border-b border-border backdrop-blur-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="block">
              <img src="/JJBAlogo.png" alt="Jan Jansen bouwkundig adviseurs logo" class="h-20 w-auto transition-transform hover:scale-105" />
            </NuxtLink>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            <NuxtLink 
              v-for="item in menuItems" 
              :key="item.route"
              :to="item.route"
              class="px-4 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200 relative"
              active-class="text-primary bg-muted font-semibold"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
          
          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <Button 
              @click="mobileMenuVisible = true" 
              icon="pi pi-bars" 
              severity="secondary" 
              text 
              size="large"
              aria-label="Menu"
              class="!p-3 !text-foreground hover:!text-primary"
            />
          </div>
        </div>
      </nav>
    </header>

    <!-- Mobile Menu Drawer -->
    <Drawer v-model:visible="mobileMenuVisible" position="right" class="!w-full sm:!w-80">
      <template #container="{ closeCallback }">
        <div class="flex flex-col h-full bg-card">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-border">
            <div class="flex items-center space-x-3">
              <img src="/JJBAlogo.png" alt="Jan Jansen bouwkundig adviseurs logo" class="h-10 w-auto" />
              <span class="font-semibold text-lg text-foreground">Menu</span>
            </div>
            <Button 
              @click="closeCallback" 
              icon="pi pi-times" 
              text 
              severity="secondary"
              size="large"
              aria-label="Sluiten"
              class="!p-2 !text-foreground hover:!text-primary"
            />
          </div>
          
          <!-- Navigation Links -->
          <div class="flex-1 overflow-y-auto p-4">
            <nav class="space-y-2">
              <NuxtLink 
                v-for="item in menuItems" 
                :key="item.label"
                :to="item.route"
                @click="closeCallback"
                class="flex items-center p-4 rounded-lg hover:bg-muted transition-all duration-200 text-foreground font-medium border-l-4 border-transparent hover:border-primary group"
                active-class="bg-muted text-primary font-semibold border-primary"
              >
                <span class="text-base">{{ item.label }}</span>
                <i class="pi pi-chevron-right ml-auto text-muted-foreground group-hover:text-primary transition-colors"></i>
              </NuxtLink>
            </nav>
          </div>
          
          <!-- Footer -->
          <div class="p-6 border-t border-border bg-muted">
            <div class="text-center text-sm text-muted-foreground">
              <p>Jan Jansen bouwkundig adviseurs</p>
              <p class="mt-1">info@janjansen.net</p>
            </div>
          </div>
        </div>
      </template>
    </Drawer>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-muted border-t border-border">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <img src="/JJBAlogo.png" alt="Jan Jansen bouwkundig adviseurs logo" class="h-12 w-auto" />
              <h3 class="text-lg font-semibold text-foreground">Jan Jansen bouwkundig adviseurs</h3>
            </div>
            <p class="text-muted-foreground mb-4">
              Het creëren van uitzonderlijke ruimtes die inspireren en duurzaam zijn door middel van innovatief ontwerp en duurzame praktijken.
            </p>
            <p class="text-muted-foreground text-sm">
              U bent uiteraard ook welkom bij ons op kantoor. Doen we gelijk een bakje koffie.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4 text-foreground">Contactgegevens</h3>
            <div class="space-y-2 text-muted-foreground">
              <p class="flex items-center gap-2">
                <i class="pi pi-map-marker text-primary"></i>
                Het Vergun 26b, 6931 KD Westervoort
              </p>
              <p class="flex items-center gap-2">
                <i class="pi pi-phone text-primary"></i>
                <a href="tel:0263115990" class="hover:text-primary transition-colors">026 311 5990</a>
              </p>
              <p class="flex items-center gap-2">
                <i class="pi pi-envelope text-primary"></i>
                <a href="mailto:info@janjansen.net" class="hover:text-primary transition-colors">info@janjansen.net</a>
              </p>
              <p class="flex items-center gap-2">
                <i class="pi pi-building text-primary"></i>
                <span>BTW: NL 0012 7425 3B09</span>
              </p>
            </div>
          </div>
        </div>
        <Divider class="my-8" />
        <div class="text-center text-muted-foreground">
          <p>&copy; {{ new Date().getFullYear() }} Jan Jansen bouwkundig adviseurs. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const mobileMenuVisible = ref(false)

const menuItems = ref([
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Over Ons', 
    route: '/over-ons'
  },
  {
    label: 'Energielabels',
    route: '/energielabels'
  },
  {
    label: 'Nieuws',
    route: '/nieuws/page-1'
  },
  {
    label: 'Contact',
    route: '/contact'
  }
])

useHead({
  htmlAttrs: {
    class: 'h-full dark'
  },
  bodyAttrs: {
    class: 'h-full'
  }
})
</script>
