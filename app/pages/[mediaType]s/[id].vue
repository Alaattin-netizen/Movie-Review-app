<script setup lang="ts">
const route = useRoute()
const mediaType = route.params.mediaType as MediaType
const id = route.params.id as string

const { data, pending, error } = useGetMedia(mediaType, id)
</script>

<template>
  <div>
    <div v-if="pending" class="text-center py-8">
      <UIcon name="i-lucide-loader-circle" class="animate-spin text-2xl" />
    </div>

    <div v-else-if="error" class="text-center text-red-500 py-8">
      Failed to load details.
    </div>

    <MediaInfo v-else-if="data" :media="data" />

    <p v-else class="text-center py-8">
      No data available.
    </p>
  </div>
</template>
