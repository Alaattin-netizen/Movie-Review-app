export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.tmdbApiKey
  const body = await readBody(event) // { request_token, username, password }

  if (!body.request_token || !body.username || !body.password) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  try {
    const response = await $fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login', {
      method: 'POST',
      query: { api_key: apiKey },
      body: {
        request_token: body.request_token,
        username: body.username,
        password: body.password,
      },
    })
    return response
  }
  catch (error) {
    console.error('TMDB request token error:', error)
  }
})
