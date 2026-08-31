<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items: Media[]
    title?: string
    posterSize?: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780'
    showArrows?: boolean
  }>(),
  {
    title: '',
    posterSize: 'w500',
    showArrows: true,
  },
)

defineEmits<{
  itemClick: [item: Media]
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function updateScrollState() {
  const el = scrollContainer.value
  if (!el)
    return
  canScrollLeft.value = el.scrollLeft > 0
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

function scrollLeft() {
  if (!scrollContainer.value)
    return
  scrollContainer.value.scrollBy({
    left: -scrollContainer.value.clientWidth * 0.8,
    behavior: 'smooth',
  })
}

function scrollRight() {
  if (!scrollContainer.value)
    return
  scrollContainer.value.scrollBy({
    left: scrollContainer.value.clientWidth * 0.8,
    behavior: 'smooth',
  })
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('resize', updateScrollState)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScrollState)
})
</script>

<template>
  <div>
    <div class="relative group">
      <UButton
        v-if="showArrows"
        color="neutral"
        variant="ghost"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
        :disabled="!canScrollLeft"
        @click="scrollLeft"
      >
        <UIcon name="i-lucide-chevron-left" class="w-5 h-5" />
      </UButton>

      <div
        ref="scrollContainer"
        class="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x"
        @scroll="updateScrollState"
      >
        <div
          v-for="item in items"
          :key="item.id"
          class="shrink-0 w-48 snap-start cursor-pointer hover:scale-105 transition-transform duration-200"
          @click="$emit('itemClick', item)"
        >
          <UContainer>
            <img
              v-if="item.poster_path"
              :src="`https://image.tmdb.org/t/p/${props.posterSize}${item.poster_path}`"
              :alt="item.title || item.name"
              class="rounded-lg shadow-md w-full"
              loading="lazy"
            >

            <div
              v-else
              class="rounded-lg shadow-md w-full bg-gray-200 aspect-2/3 flex items-center justify-center text-gray-500 text-sm"
            >
              No Image
            </div>
            <p class="mt-2 text-sm font-medium text-center truncate">
              {{ item.title || item.name }}
            </p>
          </ucontainer>
        </div>
      </div>

      <UButton
        v-if="showArrows"
        color="neutral"
        variant="ghost"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
        :disabled="!canScrollRight"
        @click="scrollRight"
      >
        <UIcon name="i-lucide-chevron-right" class="w-5 h-5" />
      </UButton>
    </div>
  </div>
</template>
