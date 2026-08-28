<script setup lang="ts">
const props = defineProps<{
  media: Media
}>()

const title = computed(() => props.media.title || props.media.name || 'Untitled')
const releaseYear = computed(() => {
  const date = props.media.release_date || props.media.first_air_date
  return date ? new Date(date).getFullYear() : null
})

const showVideoModal = ref(false)
const selectedVideo = ref<Video | null>(null)

function openVideo(video: Video) {
  selectedVideo.value = video
  showVideoModal.value = true
}

function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

function formatDate(dateString?: string): string {
  if (!dateString)
    return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getYouTubeThumbnail(key: string): string {
  return `https://img.youtube.com/vi/${key}/0.jpg`
}

function getImageUrl(path: string, size = 'w185'): string {
  return `https://image.tmdb.org/t/p/${size}${path}`
}

const CREW_ROLES = ['Director', 'Producer', 'Writer', 'Screenplay', 'Creator', 'Executive Producer']
function getKeyCrew(crew: Person[]): Person[] {
  return crew.filter(person => CREW_ROLES.includes(person.job || ''))
}

const MAX_IMAGES = 20
</script>

<template>
  <UCard class="max-w-4xl mx-auto">
    <div class="flex flex-col md:flex-row gap-6">
      <div class="shrink-0 w-full md:w-48">
        <NuxtImg
          v-if="media.poster_path"
          :src="`https://image.tmdb.org/t/p/w342${media.poster_path}`"
          :alt="title"
          class="w-full rounded-lg shadow"
          loading="lazy"
        />
        <div v-else class="w-full aspect-2/3 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          No poster
        </div>
      </div>

      <div class="flex-1 space-y-3">
        <h1 class="text-2xl font-bold">
          {{ title }}
          <span v-if="releaseYear" class="text-gray-500 font-normal text-lg">
            ({{ releaseYear }})
          </span>
        </h1>

        <div class="flex flex-wrap items-center gap-2">
          <UBadge v-if="media.vote_average" color="warning" variant="solid">
            ★ {{ media.vote_average.toFixed(1) }}
          </UBadge>
          <UBadge v-if="media.vote_count" color="neutral" variant="subtle">
            {{ media.vote_count }} votes
          </UBadge>

          <span v-if="media.runtime" class="text-sm text-gray-600">
            {{ formatRuntime(media.runtime) }}
          </span>
          <span v-if="media.genres?.length" class="text-sm text-gray-600">
            {{ media.genres.map(g => g.name).join(', ') }}
          </span>
        </div>

        <p v-if="media.overview" class="text-gray-700 leading-relaxed">
          {{ media.overview }}
        </p>

        <div v-if="media.release_date || media.first_air_date" class="text-sm text-gray-500">
          Released: {{ formatDate(media.release_date || media.first_air_date) }}
        </div>

        <div v-if="media.credits?.cast?.length || media.credits?.crew?.length" class="mt-4 space-y-2">
          <div v-if="media.credits.cast?.length">
            <h3 class="font-semibold text-sm uppercase tracking-wide text-gray-500">
              Cast
            </h3>
            <div class="flex flex-wrap gap-2 mt-1">
              <UBadge v-for="actor in media.credits.cast.slice(0, 8)" :key="actor.id" variant="subtle" class="cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors" @click="navigateTo(`/person/${actor.id}`) ">
                {{ actor.name }}
              </UBadge>
            </div>
          </div>

          <div v-if="getKeyCrew(media.credits.crew).length">
            <h3 class="font-semibold text-sm uppercase tracking-wide text-gray-500 mt-2">
              Crew
            </h3>
            <div class="flex flex-wrap gap-2 mt-1">
              <UBadge
                v-for="person in getKeyCrew(media.credits.crew)"
                :key="person.id"
                variant="subtle"
                color="primary"
                class="cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                @click="navigateTo(`/person/${person.id}`)"
              >
                {{ person.name }} ({{ person.job }})
              </UBadge>
            </div>
          </div>
        </div>
      </div>
    </div>

    <UContainer v-if="media.images?.posters?.length || media.images?.backdrops?.length" class="mt-8 space-y-6">
      <div v-if="media.images.posters?.length">
        <UPageHeader title="Posters" class="mb-2" />
        <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          <NuxtImg
            v-for="(img, idx) in media.images.posters.slice(0, MAX_IMAGES)"
            :key="idx"
            :src="getImageUrl(img.file_path, 'w185')"
            :alt="`Poster ${idx + 1}`"
            class="rounded-lg shadow hover:scale-105 transition-transform duration-200 object-cover aspect-2/3 w-32 shrink-0"
            loading="lazy"
          />
        </div>
      </div>

      <div v-if="media.images.backdrops?.length">
        <UPageHeader title="Backdrops" class="mb-2" />
        <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          <NuxtImg
            v-for="(img, idx) in media.images.backdrops.slice(0, MAX_IMAGES)"
            :key="idx"
            :src="getImageUrl(img.file_path, 'w300')"
            :alt="`Backdrop ${idx + 1}`"
            class="rounded-lg shadow hover:scale-105 transition-transform duration-200 object-cover aspect-video w-60 shrink-0"
            loading="lazy"
          />
        </div>
      </div>
    </UContainer>

    <UContainer v-if="media.videos?.results?.length" class="mt-8 space-y-4">
      <UPageHeader title="Videos" />
      <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        <UCard
          v-for="video in media.videos.results"
          :key="video.id"
          class="cursor-pointer hover:shadow-lg transition-shadow min-w-50 max-w-60 shrink-0"
          @click="openVideo(video)"
        >
          <div class="relative aspect-video">
            <NuxtImg
              :src="getYouTubeThumbnail(video.key)"
              :alt="video.name"
              class="w-full h-full object-cover rounded-md"
              loading="lazy"
            />
            <div class="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors rounded-md">
              <UIcon name="i-lucide-play-circle" class="w-12 h-12 text-white/90" />
            </div>
          </div>
          <p class="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-1">
            {{ video.name }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ video.type }} • {{ video.site }}
          </p>
        </UCard>
      </div>
    </UContainer>

    <UModal v-model="showVideoModal" class="max-w-4xl">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              {{ selectedVideo?.name }}
            </h3>
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="showVideoModal = false" />
          </div>
        </template>
        <div v-if="selectedVideo" class="aspect-video">
          <iframe
            :src="`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`"
            frameborder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowfullscreen
            class="w-full h-full rounded-md"
          />
        </div>
      </UCard>
    </UModal>

    <UContainer v-if="media.reviews?.results?.length" class="mt-8 space-y-4">
      <UPageHeader title="Reviews" />
      <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
        <UCard
          v-for="review in media.reviews.results"
          :key="review.id"
          class="border-l-4 border-l-primary-500"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="font-medium">
                {{ review.author_details?.name || review.author }}
                <span v-if="review.author_details?.rating" class="ml-2 text-sm text-yellow-600">
                  ★ {{ review.author_details.rating.toFixed(1) }}
                </span>
              </p>
              <p class="text-xs text-gray-500">
                {{ new Date(review.created_at).toLocaleDateString() }}
              </p>
            </div>
            <UBadge v-if="review.author_details?.rating" color="warning" variant="subtle">
              {{ review.author_details.rating }}/10
            </UBadge>
          </div>
          <p class="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
            {{ review.content }}
          </p>
          <UButton
            v-if="review.url"
            size="xs"
            color="primary"
            variant="link"
            :to="review.url"
            target="_blank"
          >
            Read full review
          </UButton>
        </UCard>
      </div>
    </UContainer>
  </UCard>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  height: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
</style>
