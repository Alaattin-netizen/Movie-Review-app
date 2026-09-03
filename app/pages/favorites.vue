<script setup lang="ts">
import { getFavoriteMovies, getFavoriteTv } from '~/composables/useApi'

const { data: moviesData, pending: moviesPending } = getFavoriteMovies()
const { data: tvData, pending: tvPending } = getFavoriteTv()

const loading = computed(() => moviesPending.value || tvPending.value)

function goToDetail(media: Media) {
  const type = media.media_type || (media.title ? 'movie' : 'tv')
  navigateTo(`/${type}s/${media.id}`)
}
</script>

<template>
  <UPage>
    <UPageBody>
      <div v-if="loading" class="text-center py-8">
        <UIcon name="i-lucide-loader-circle" class="animate-spin text-2xl" />
      </div>
      <div v-else>
        <MediaCarousel
          v-if="moviesData?.movies?.length"
          :items="moviesData.movies"
          title="Favorite Movies"
          @item-click="goToDetail"
        />
        <MediaCarousel
          v-if="tvData?.tv?.length"
          :items="tvData.tv"
          title="Favorite TV Shows"
          @item-click="goToDetail"
        />
        <p v-if="!moviesData?.movies?.length && !tvData?.tv?.length" class="text-center text-muted py-8">
          No favorites yet.
        </p>
      </div>
    </UPageBody>
  </UPage>
</template>
