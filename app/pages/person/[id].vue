<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string
const { data: person, pending, error } = useGetPerson(id)
</script>

<template>
  <div>
    <div v-if="pending" class="text-center py-8">
      <UIcon name="i-lucide-loader-circle" class="animate-spin text-2xl" />
    </div>
    <div v-else-if="error" class="text-center text-red-500 py-8">
      Failed to load person details.
    </div>
    <PersonInfo v-else-if="person" :person="person" />
    <p v-else class="text-center py-8">
      No data available.
    </p>
  </div>
</template>
