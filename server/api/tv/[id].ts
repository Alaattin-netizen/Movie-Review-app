export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'TV ID is required',
    })
  }

  const url = getTmdbUrl(`/tv/${id}`)
  const res = await $fetch(url)
  return res
})
