export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiKey = config.tmdbApiKey

  try {
    return await $fetch('https://api.themoviedb.org/3/genre/movie/list', {
      query: { api_key: apiKey },
    })
  }
  catch (error) {
    console.error('Genres fetch failed:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch genres' })
  }
})
