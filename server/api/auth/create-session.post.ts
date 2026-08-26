import process from 'node:process'

interface CreateSessionResponse {
  success: boolean
  session_id: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.tmdbApiKey

  if (!apiKey) {
    console.error('TMDB API key missing in create-session')
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error' })
  }

  const body = await readBody(event)
  if (!body.request_token) {
    throw createError({ statusCode: 400, statusMessage: 'Missing request token' })
  }

  try {
    const response = await $fetch<CreateSessionResponse>('https://api.themoviedb.org/3/authentication/session/new', {
      method: 'POST',
      query: { api_key: apiKey },
      body: { request_token: body.request_token },
    })

    if (response.success) {
      setCookie(event, 'tmdb_session_id', response.session_id, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
    }

    return response
  }
  catch (error) {
    console.error('TMDB session creation failed:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to create session' })
  }
})
