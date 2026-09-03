<script setup lang="ts">
import { getWatchlistMovies, getWatchlistTv } from '~/composables/useApi'

const { data: moviesData, pending: moviesPending } = getWatchlistMovies()
const { data: tvData, pending: tvPending } = getWatchlistTv()

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
          title="Watchlist Movies"
          @item-click="goToDetail"
        />
        <MediaCarousel
          v-if="tvData?.tv?.length"
          :items="tvData.tv"
          title="Watchlist TV Shows"
          @item-click="goToDetail"
        />
        <p v-if="!moviesData?.movies?.length && !tvData?.tv?.length" class="text-center text-muted py-8">
          Your watchlist is empty.
        </p>
      </div>
    </UPageBody>
  </UPage>
</template>
