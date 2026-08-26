export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.tmdbApiKey
  const sessionId = getCookie(event, 'tmdb_session_id')

  if (!sessionId) {
    return { success: true }
  }

  try {
    await $fetch('https://api.themoviedb.org/3/authentication/session', {
      method: 'DELETE',
      query: { api_key: apiKey },
      body: { session_id: sessionId },
    })
  }
  catch (error) {
    console.error(error)
  }

  deleteCookie(event, 'tmdb_session_id')
  return { success: true }
})
