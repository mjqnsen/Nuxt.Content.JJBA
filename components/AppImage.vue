<template>
  <img 
    :src="imageSrc"
    :alt="alt"
    :class="imageClass"
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

const { getImageSrc, handleImageError } = useImageFallback()

const imageSrc = computed(() => getImageSrc(props.src, props.fallback))
const imageClass = computed(() => props.class)

const onError = (event) => {
  handleImageError(event, props.fallback)
  emit('error', event)
}

const onLoad = (event) => {
  emit('load', event)
}
</script>
