export default defineEventHandler(async (event) => {
  const { mediaType, mediaId, rating } = await readBody(event)

  const config = useRuntimeConfig()
  const sessionId = config.tmdbSessionId

  if (!sessionId) {
    throw createError({ statusCode: 500, statusMessage: 'Server not configured' })
  }

  const url = getTmdbUrl(`/${mediaType}/${mediaId}/rating`, { session_id: sessionId })
  const response = await $fetch(url, {
    method: 'POST',
    body: { value: rating },
  })
  return response
})
