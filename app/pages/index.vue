<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const toast = useToast()
const api = useApi()

const fields: AuthFormField[] = [
  { name: 'username', type: 'text', label: 'Username', placeholder: 'Enter your TMDB username', required: true },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', required: true },
  { name: 'remember', label: 'Remember me', type: 'checkbox' },
]

const providers = [
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: () => {
      toast.add({ title: 'Google', description: 'Login with Google is not available yet.' })
    },
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => {
      toast.add({ title: 'GitHub', description: 'Login with GitHub is not available yet.' })
    },
  },
]

const schema = z.object({
  username: z.string('Username is required').min(1, 'Username is required'),
  password: z.string('Password is required').min(8, 'Password must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    await api.login(payload.data.username, payload.data.password)

    toast.add({
      title: 'Login successful',
      description: 'You are now logged in.',
      color: 'success',
      icon: 'i-heroicons-check-circle',
    })

    navigateTo('/')
  }
  catch (error) {
    // Type-safe error message extraction
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.'

    toast.add({
      title: 'Login failed',
      description: message,
      color: 'error',
      icon: 'i-heroicons-exclamation-circle',
    })
    console.error(error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
