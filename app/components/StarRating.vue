<script setup lang="ts">
const props = defineProps<{
  value: number
}>()

const fullStars = computed(() => Math.floor(props.value / 2))
const partialStar = computed(() => (props.value % 2) / 2)
</script>

<template>
  <div class="flex gap-1">
    <div v-for="i in 5" :key="i" class="relative size-6">
      <UIcon name="i-heroicons-star" class="size-6 text-muted" />

      <UIcon
        v-if="i <= fullStars"
        name="i-heroicons-star-solid"
        class="absolute inset-0 size-6 text-warning"
      />

      <UIcon
        v-else-if="i === fullStars + 1 && partialStar > 0"
        name="i-heroicons-star-solid"
        class="absolute inset-0 size-6 text-warning"
        :style="`clip-path: inset(0 ${(1 - partialStar) * 100}% 0 0)`"
      />
    </div>
  </div>
</template>
