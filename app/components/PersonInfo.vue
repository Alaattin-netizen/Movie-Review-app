<script setup lang="ts">
const props = defineProps<{
  person: Person
}>()

const name = computed(() => props.person.name || 'Unknown')
const profilePath = computed(() => props.person.profile_path)
const biography = computed(() => props.person.biography || 'No biography available.')
const birthday = computed(() => props.person.birthday)
const placeOfBirth = computed(() => props.person.place_of_birth)
const knownFor = computed(() => props.person.known_for_department)

const profileImages = computed(() => props.person.images?.profiles || [])

const allCredits = computed(() => {
  const cast = props.person.combined_credits?.cast || []
  const crew = props.person.combined_credits?.crew || []
  return [...cast, ...crew]
})

const movieCredits = computed(() =>
  allCredits.value.filter(item => item.media_type === 'movie'),
)
const tvCredits = computed(() =>
  allCredits.value.filter(item => item.media_type === 'tv'),
)

function formatDate(date?: string): string {
  if (!date)
    return 'Unknown'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function goToMedia(media: Media) {
  const type = media.media_type || (media.title ? 'movie' : 'tv')
  navigateTo(`/${type}s/${media.id}`)
}
</script>

<template>
  <UCard class="max-w-4xl mx-auto">
    <!-- Header: photo + personal info -->
    <UGrid :cols="{ default: 1, md: 4 }" gap="6" class="items-start">
      <div class="md:col-span-1 w-full md:max-w-50">
        <NuxtImg
          v-if="profilePath"
          :src="`https://image.tmdb.org/t/p/w342${profilePath}`"
          :alt="name"
          class="w-full rounded-lg shadow"
          loading="lazy"
        />
        <div v-else class="w-full aspect-2/3 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          No photo
        </div>
      </div>

      <div class="md:col-span-3 space-y-3">
        <h1 class="text-2xl font-bold">
          {{ name }}
        </h1>

        <UGrid :cols="{ default: 1, sm: 2 }" gap="2" class="text-sm">
          <div v-if="knownFor" class="flex items-center gap-1">
            <span class="font-medium">Known for:</span>
            <span>{{ knownFor }}</span>
          </div>
          <div v-if="birthday" class="flex items-center gap-1">
            <span class="font-medium">Born:</span>
            <span>{{ formatDate(birthday) }}</span>
          </div>
          <div v-if="placeOfBirth" class="flex items-center gap-1">
            <span class="font-medium">Place of birth:</span>
            <span>{{ placeOfBirth }}</span>
          </div>
        </UGrid>

        <div>
          <UPageHeader title="Biography" class="mb-1" />
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">
            {{ biography }}
          </p>
        </div>
      </div>
    </UGrid>

    <!-- Profile Images (custom horizontal scroll) -->
    <UContainer v-if="profileImages.length" class="mt-8 space-y-4">
      <UPageHeader title="Profile Images" />
      <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        <NuxtImg
          v-for="(img, idx) in profileImages.slice(0, 20)"
          :key="idx"
          :src="`https://image.tmdb.org/t/p/w185${img.file_path}`"
          :alt="`Profile ${idx + 1}`"
          class="rounded-lg shadow hover:scale-105 transition-transform duration-200 object-cover w-32 h-32 shrink-0"
          loading="lazy"
        />
      </div>
    </UContainer>

    <!-- Combined Credits -->
    <UContainer v-if="movieCredits.length || tvCredits.length" class="mt-8 space-y-6">
      <UPageHeader title="Credits" />

      <!-- Movies -->
      <div v-if="movieCredits.length">
        <UPageHeader title="Movies" size="h3" class="mb-2" />
        <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          <div
            v-for="media in movieCredits.slice(0, 20)"
            :key="media.id"
            class="cursor-pointer shrink-0 w-32"
            @click="goToMedia(media)"
          >
            <NuxtImg
              :src="media.poster_path ? `https://image.tmdb.org/t/p/w185${media.poster_path}` : '/placeholder-poster.png'"
              :alt="media.title || media.name || 'Untitled'"
              class="rounded-lg shadow w-full aspect-2/3 object-cover"
              loading="lazy"
            />
            <p class="mt-1 text-sm font-medium text-center line-clamp-2">
              {{ media.title || media.name }}
            </p>
            <p class="text-xs text-gray-500 text-center">
              {{ media.release_date ? new Date(media.release_date).getFullYear() : '' }}
              {{ media.character ? `as ${media.character}` : '' }}
              {{ media.job ? `(${media.job})` : '' }}
            </p>
          </div>
        </div>
      </div>

      <!-- TV Shows -->
      <div v-if="tvCredits.length">
        <UPageHeader title="TV Shows" size="h3" class="mb-2" />
        <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          <div
            v-for="media in tvCredits.slice(0, 20)"
            :key="media.id"
            class="cursor-pointer shrink-0 w-32"
            @click="goToMedia(media)"
          >
            <NuxtImg
              :src="media.poster_path ? `https://image.tmdb.org/t/p/w185${media.poster_path}` : '/placeholder-poster.png'"
              :alt="media.name || media.title || 'Untitled'"
              class="rounded-lg shadow w-full aspect-2/3 object-cover"
              loading="lazy"
            />
            <p class="mt-1 text-sm font-medium text-center line-clamp-2">
              {{ media.name || media.title }}
            </p>
            <p class="text-xs text-gray-500 text-center">
              {{ media.first_air_date ? new Date(media.first_air_date).getFullYear() : '' }}
              {{ media.character ? `as ${media.character}` : '' }}
              {{ media.job ? `(${media.job})` : '' }}
            </p>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- No credits -->
    <UContainer v-else class="mt-8">
      <p class="text-gray-500 text-sm">
        No credits available.
      </p>
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
