export default defineEventHandler(async (event) => {
  const { mediaType, mediaId, watchlist } = await readBody(event)

  const config = useRuntimeConfig()
  const sessionId = config.tmdbSessionId
  const accountId = config.tmdbAccountId

  if (!sessionId || !accountId) {
    throw createError({ statusCode: 500, statusMessage: 'Server not configured' })
  }

  const url = getTmdbUrl(`/account/${accountId}/watchlist`, { session_id: sessionId })
  const response = await $fetch(url, {
    method: 'POST',
    body: { media_type: mediaType, media_id: mediaId, watchlist },
  })
  return response
})
