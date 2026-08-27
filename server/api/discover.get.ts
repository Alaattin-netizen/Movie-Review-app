export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const type = query.type ? String(query.type) : 'movie'
  const page = query.page ? String(query.page) : '1'

  const url = getTmdbUrl(`/discover/${type}`, { page })
  const res = await $fetch(url)
  return res
})
