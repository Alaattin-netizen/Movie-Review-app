export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = query.page ? String(query.page) : '1'

  const url = getTmdbUrl(`/movie/popular`, { page })
  const res = await $fetch(url)
  return res
})
