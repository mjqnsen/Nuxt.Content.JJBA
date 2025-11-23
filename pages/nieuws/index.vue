<template>
  <!-- This page redirects to /nieuws/1 -->
</template>

<script setup>
// Redirect to page 1 for SEO and clean URLs
await navigateTo('/nieuws/page-1', { replace: true })
</script>


