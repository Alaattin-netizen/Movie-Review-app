export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string
  const page = query.page ? String(query.page) : '1'

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'movie ID is required',
    })
  }

  const url = getTmdbUrl(`/movie/${id}/reviews`, { page })
  const res = await $fetch(url)
  return res
})
