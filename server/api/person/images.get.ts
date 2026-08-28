export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Person ID is required',
    })
  }

  const url = getTmdbUrl(`/person/${id}/images`)
  const res = await $fetch(url)
  return res
})
