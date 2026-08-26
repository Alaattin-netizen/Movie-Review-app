export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.tmdbApiKey
  const query = getQuery(event)

  if (!query.q) {
    throw createError({ statusCode: 400, statusMessage: 'Missing search query' })
  }

  try {
    return await $fetch('https://api.themoviedb.org/3/search/movie', {
      query: {
        api_key: apiKey,
        query: query.q,
        page: query.page || 1,
      },
    })
  }
  catch (error) {
    console.error('Search failed:', error)
    throw createError({ statusCode: 500, statusMessage: 'Search failed' })
  }
})
