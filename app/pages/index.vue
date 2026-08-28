<script setup lang="ts">
const { data: moviesData, pending: moviesPending } = useDiscover('movie', 1)
const { data: tvsData, pending: tvsPending } = useDiscover('tv', 1)

const loading = computed(() => moviesPending.value || tvsPending.value)

function goToDetail(media: Media) {
  const type = media.media_type || (media.title ? 'movies' : 'tvs')
  navigateTo(`/${type}/${media.id}`)
}
</script>

<template>
  <UPage>
    <UPageHero
      title="MOVIES APP"
      description="Review the best movies!!"
    />

    <ClientOnly>
      <div v-if="loading" class="w-full flex justify-center">
        <div class="rounded-full border-4 w-12 h-12 border-l-primary-200 border-t-primary-400 border-r-primary-600 border-b-primary-800 animate-spin" />
      </div>

      <UPageBody v-else>
        <UContainer>
          <UPageHeader title="Movies" />
          <MediaCarousel
            v-if="moviesData?.results?.length"
            :items="moviesData.results"
            title="Popular Movies"
            @item-click="goToDetail"
          />
        </UContainer>

        <UContainer>
          <UPageHeader title="Tvs" />
          <MediaCarousel
            v-if="tvsData?.results?.length"
            :items="tvsData.results"
            title="Popular TV tvs"
            @item-click="goToDetail"
          />
        </UContainer>

        <UPageCTA
          variant="solid"
          title="ENJOY!"
          :ui="{ root: 'rounded-none' }"
        />
      </UPageBody>

      <template #fallback>
        <div class="w-full flex justify-center">
          <div class="rounded-full border-4 w-12 h-12 border-l-primary-200 border-t-primary-400 border-r-primary-600 border-b-primary-800 animate-spin" />
        </div>
      </template>
    </ClientOnly>
  </UPage>
  <!-- <div class="container mx-auto px-4 py-8 space-y-12">
    <div v-if="moviesPending || tvsPending" class="text-center py-8">
      <UIcon name="i-lucide-loader-circle" class="animate-spin text-2xl" />
    </div>

    <div v-else-if="moviesError || tvsError" class="text-center text-red-500 py-8">
      Failed to load content.
    </div>

    <MediaCarousel
      v-if="moviesData?.results?.length"
      :items="moviesData.results"
      title="Popular Movies"
      @item-click="goToDetail"
    />

    <MediaCarousel
      v-if="tvsData?.results?.length"
      :items="tvsData.results"
      title="Popular TV tvs"
      @item-click="goToDetail"
    />

    <p v-if="!moviesData?.results?.length && !tvsData?.results?.length" class="text-center py-8">
      No content available.
    </p>
  </div> -->
</template>
