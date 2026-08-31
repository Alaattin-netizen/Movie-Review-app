<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

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
])
</script>

<template>
  <UApp>
    <UHeader>
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
