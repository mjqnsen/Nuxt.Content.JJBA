<template>
  <img 
    :src="src"
    :alt="alt"
    :class="class"
    @error="onError"
    @load="onLoad"
    v-bind="$attrs"
  />
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  fallback: {
    type: String,
    default: ''
  },
  class: {
    type: [String, Array, Object],
    default: ''
  }
})

const emit = defineEmits(['load', 'error'])

const onError = (event) => {
  emit('error', event)
}

const onLoad = (event) => {
  emit('load', event)
}
</script>
