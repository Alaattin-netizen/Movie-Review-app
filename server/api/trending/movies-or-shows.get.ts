export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const timeWindow = query.time_window ? String(query.time_window) : 'day'
  const type = query.type ? String(query.type) : 'movie'
  const page = query.page ? String(query.page) : '1'

  const url = getTmdbUrl(`/trending/${type}/${timeWindow}`, { page })
  const res = await $fetch(url)
  return res
})
