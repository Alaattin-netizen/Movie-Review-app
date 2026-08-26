export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiKey = config.tmdbApiKey

  try {
    const response = await $fetch('https://api.themoviedb.org/3/authentication/token/new', {
      query: { api_key: apiKey },
    })
    return response
  }
  catch (error) {
    console.error('TMDB request token error:', error)
  }
})
