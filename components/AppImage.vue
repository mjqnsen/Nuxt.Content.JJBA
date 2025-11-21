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

const { getImageUrl } = useImageUrl()

const imageSrc = computed(() => getImageUrl(props.src))
const imageClass = computed(() => props.class)

const onError = (event) => {
  emit('error', event)
}

const onLoad = (event) => {
  emit('load', event)
}
</script>
