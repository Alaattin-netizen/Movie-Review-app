export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const type = query.type ? String(query.type) : 'movie'
  const page = query.page ? String(query.page) : '1'
  const searchQuery = query.query ? String(query.query) : ''

  const url = getTmdbUrl(`/search/${type}`, { page, query: searchQuery })

  try {
    const res = await $fetch(url)
    return res
  }
  catch (error) {
    console.error('TMDB search failed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to search TMDB',
    })
  }
})
