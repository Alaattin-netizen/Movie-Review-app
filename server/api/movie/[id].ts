export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Movie ID is required',
    })
  }

  const url = getTmdbUrl(`/movie/${id}`)
  const res = await $fetch(url)
  return res
})
