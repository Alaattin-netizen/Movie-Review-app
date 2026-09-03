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
      title="CineScore"
    >
      <template #description>
        <div class="flex justify-center">
          <NuxtImg
            src="/logo-light.png"
            alt="Logo"
            class="h-50 w-auto dark:hidden"
          />
          <NuxtImg
            src="/logo-dark.png"
            alt="Logo"
            class="h-50 w-auto hidden dark:block"
          />
        </div>
        <!-- Optionally keep the original description text -->
        <p class="text-muted text-center mt-2">
          Review the best movies!!
        </p>
      </template>
    </UPageHero>

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
</template>
