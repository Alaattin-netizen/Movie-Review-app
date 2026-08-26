export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = config.tmdbAccessToken
  const id = getRouterParam(event, 'id')

  const data = await $fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
})
