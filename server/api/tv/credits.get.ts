export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tv ID is required',
    })
  }

  const url = getTmdbUrl(`/tv/${id}/credits`)
  const res = await $fetch(url)
  return res
})
