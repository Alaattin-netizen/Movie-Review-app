<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

useHead({
  title: 'CineScore',
})

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Movies App',
    to: '/',
    icon: 'i-lucide-clapperboard',
  },
  {
    label: 'Tvs',
    to: '/tvs',
    active: route.path.startsWith('/tvs'),
    icon: 'i-lucide-tv-minimal',
  },
  {
    label: 'Movies',
    to: '/movies',
    active: route.path.startsWith('/movies'),
    icon: 'i-lucide-film',
  },
  {
    label: 'Favorites',
    to: '/favorites',
    active: route.path.startsWith('/favorites'),
    icon: 'i-lucide-heart',
  },
  {
    label: 'Watchlist',
    to: '/watchlist',
    active: route.path.startsWith('/watchlist'),
    icon: 'i-lucide-bookmark',
  },
])
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtImg
          src="/logo-light.png"
          alt="Logo"
          class="h-8 w-auto dark:hidden"
        />

        <NuxtImg
          src="/logo-dark.png"
          alt="Logo"
          class="h-8 w-auto hidden dark:block"
        />
      </template>
      <UNavigationMenu :items="items" />
      <template #right>
        <UColorModeButton />
      </template>

      <template #body>
        <UNavigationMenu orientation="vertical" :items="items" />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>
    <UFooter>
      <template #right>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} MovieApp. All rights reserved.
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
