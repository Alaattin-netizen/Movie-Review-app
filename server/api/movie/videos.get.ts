export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const id = query.id as string
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Movie ID is required',
    })
  }

  const url = getTmdbUrl(`/movie/${id}/videos`)
  const res = await $fetch(url)
  return res
})
