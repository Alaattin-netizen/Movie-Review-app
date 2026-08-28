export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id)
    throw createError({ statusCode: 400, statusMessage: 'Person ID required' })

  const url = getTmdbUrl(`/person/${id}`)
  const data = await $fetch(url)
  return data
})
