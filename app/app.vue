<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2">
          <UIcon name="i-lucide-clapperboard" />
          <span class="font-bold">MovieApp</span>
        </NuxtLink>
      </template>    <UColorModeButton />
    </uheader>

    <UMain>
      <NuxtPage />
    </UMain>
    <UFooter>
      <template #right>
        <p class="text-sm text-gray-500">
          © {{ new Date().getFullYear() }} MovieApp. All rights reserved.
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
