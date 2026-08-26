export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.tmdbApiKey
  const query = getQuery(event)
  const timeWindow = query.time_window || 'day'

  try {
    return await $fetch(`https://api.themoviedb.org/3/trending/movie/${timeWindow}`, {
      query: { api_key: apiKey, page: query.page || 1 },
    })
  }
  catch (error) {
    console.error('Trending fetch failed:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch trending' })
  }
})
