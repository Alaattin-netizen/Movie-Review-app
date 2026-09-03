export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'tmdb_session_id')
  if (!sessionId) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  try {
    const url = getTmdbUrl('/account', { session_id: sessionId })
    const account = await $fetch(url) as TMDBAccount
    return { id: account.id, username: account.username }
  }
  catch {
    deleteCookie(event, 'tmdb_session_id')
    throw createError({ statusCode: 401, statusMessage: 'Invalid session' })
  }
})
