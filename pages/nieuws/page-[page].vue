<template>
  <NuxtLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-foreground mb-4">
          Nieuws en projecten
        </h1>
        <p class="text-lg text-muted-foreground">
          Blijf op de hoogte van onze laatste projecten, prestaties en inzichten
          uit de sector
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NewsCard
          v-for="article in paginatedData"
          :key="article.path"
          :article="article"
          :currentPage="pageNumber"
        />
      </div>

      <!-- Pagination Component -->
      <div v-if="totalRecords > itemsPerPage" class="mt-8 flex justify-center">
        <Paginator
          :rows="itemsPerPage"
          :totalRecords="totalRecords"
          :first="(pageNumber - 1) * itemsPerPage"
          @page="onPageChange"
          :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px':
              'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default:
              'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport',
          }"
          :rowsPerPageOptions="[6, 12, 24, 48]"
          currentPageReportTemplate="Toont {first} tot {last} van {totalRecords} artikelen"
        />
      </div>

      <div
        v-if="!paginatedData || paginatedData.length === 0"
        class="text-center py-12"
      >
        <div class="flex flex-col items-center gap-4">
          <i class="pi pi-inbox text-6xl text-muted-foreground"></i>
          <p class="text-muted-foreground text-lg">
            Momenteel zijn er geen nieuwsartikelen beschikbaar.
          </p>
          <Button
            as="a"
            href="/contact"
            label="Neem Contact Op voor Updates"
            severity="secondary"
            outlined
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const getIntegerOrDefault = (value, defaultValue) => {
  const parsed = parseInt(value);
  return isNaN(parsed) || parsed < 1 ? defaultValue : parsed;
};

// Parse page number from route params
const pageNumber = computed(() => getIntegerOrDefault(route.params.page, 1));
const itemsPerPage = 12;

// Calculate skip value for pagination
const totalSkip = computed(() => (pageNumber.value - 1) * itemsPerPage);

// Fetch paginated news articles
const data = await queryCollection("nieuws")
  .order("date", "DESC")
  .skip(totalSkip.value)
  .limit(itemsPerPage)
  .all();

// Fetch total count for pagination calculation
const total = await queryCollection("nieuws").count();


// Calculate pagination values
const totalRecords = computed(() => total ?? 0);
const totalPages = computed(() => Math.ceil(totalRecords.value / itemsPerPage));
const paginatedData = computed(() => data ?? []);

// Validate page number
if (pageNumber.value < 1) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

// Validate current page doesn't exceed total pages
if (pageNumber.value > totalPages.value && totalPages.value > 0) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

// Handle page changes
const onPageChange = (event) => {
  const newPage = Math.floor(event.first / event.rows) + 1;

  // Navigate to new page
  router.push(`/nieuws/page-${newPage}`);
};

// SEO and meta tags
const pageTitle = computed(() =>
  pageNumber.value === 1
    ? "Nieuws - Jan Jansen bouwkundig Adviseurs"
    : `Nieuws - Pagina ${pageNumber.value} - Jan Jansen bouwkundig Adviseurs`
);

const pageDescription = computed(() =>
  pageNumber.value === 1
    ? "Laatste nieuws, projectupdates en inzichten van Jan Jansen bouwkundig Adviseurs."
    : `Nieuws pagina ${pageNumber.value} - Bekijk meer nieuwsartikelen, projectupdates en inzichten van Jan Jansen bouwkundig Adviseurs.`
);

useHead({
  title: pageTitle,
  meta: [
    {
      name: "description",
      content: pageDescription,
    },
    {
      property: "og:title",
      content: pageTitle,
    },
    {
      property: "og:description",
      content: pageDescription,
    },
  ],
  link: computed(() => [
    // Add canonical URL
    {
      rel: "canonical",
      href: `https://jjbouwkundigadviseurs.nl/nieuws/page-${pageNumber.value}`,
    },
    // Add pagination links for SEO
    ...(pageNumber.value > 1
      ? [
          {
            rel: "prev",
            href:
              pageNumber.value === 2
                ? "https://jjbouwkundigadviseurs.nl/nieuws/page-1"
                : `https://jjbouwkundigadviseurs.nl/nieuws/page-${pageNumber.value - 1}`,
          },
        ]
      : []),
    ...(pageNumber.value < totalPages.value
      ? [
          {
            rel: "next",
            href: `https://jjbouwkundigadviseurs.nl/nieuws/page-${pageNumber.value + 1}`,
          },
        ]
      : []),
  ]),
});
</script>
