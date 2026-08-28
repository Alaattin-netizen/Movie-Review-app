<script setup lang="ts">
const route = useRoute()

const mediaType = computed(() => route.params.mediaType as MediaType)

const { data, pending, error } = useDiscover(mediaType, 1)

const displayTitle = computed(() => {
  const typeName = mediaType.value === 'movie' ? 'Movies' : 'TV Shows'
  return `Popular ${typeName}`
})

function goToDetail(media: Media) {
  const type = media.media_type || (media.title ? 'movie' : 'tv')
  navigateTo(`/${type}s/${media.id}`)
}
</script>

<template>
  <UPage>
    <UPageBody>
      <UPageHeader :title="displayTitle" />

      <div v-if="pending" class="text-center py-8">
        <UIcon name="i-lucide-loader-circle" class="animate-spin text-2xl" />
      </div>

      <div v-else-if="error" class="text-center text-red-500 py-8">
        Failed to load content.
      </div>

      <MediaCarousel
        v-if="data?.results?.length"
        :items="data.results"
        @item-click="goToDetail"
      />
    </UPageBody>
  </UPage>
</template>
