<script setup>
const username = ref('')
const password = ref('')
const toast = useToast()
const api = useApi() // <-- use the composable

async function login() {
  try {
    await api.login(username.value, password.value)

    toast.add({
      title: 'Login successful',
      description: 'You are now logged in.',
      color: 'green',
      icon: 'i-heroicons-check-circle',
      timeout: 3000,
    })

    navigateTo('/')
  }
  catch (error) {
    toast.add({
      title: 'Login failed',
      description: error.message || 'An unexpected error occurred.',
      color: 'red',
      icon: 'i-heroicons-exclamation-circle',
      timeout: 5000,
    })
    console.error(error)
  }
}
</script>

<template>
  <UForm @submit.prevent="login">
    <input v-model="username" type="text" placeholder="TMDB username">
    <input v-model="password" type="password" placeholder="TMDB password">
    <UButton type="submit">
      Log in
    </UButton>
  </UForm>
</template>
