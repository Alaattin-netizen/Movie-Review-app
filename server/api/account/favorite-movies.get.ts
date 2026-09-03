export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig()
  const sessionId = config.tmdbSessionId
  const accountId = config.tmdbAccountId

  if (!sessionId || !accountId) {
    throw createError({ statusCode: 500, statusMessage: 'Server not configured' })
  }

  const url = getTmdbUrl(`/account/${accountId}/favorite/movies`, { session_id: sessionId })
  const response = await $fetch<{ results: Media[] }>(url)
  return { movies: response.results }
})
