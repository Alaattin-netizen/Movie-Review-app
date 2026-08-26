interface Movie {
  id: number
  title: string
}

interface TMDBPopularResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig()
  const token = config.tmdbAccessToken

  if (!token) {
    console.error('TMDB token is missing!')
  }

  try {
    const data = await $fetch<TMDBPopularResponse>('https://api.themoviedb.org/3/movie/popular', {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.warn('TMDB returned', data.results.length, 'movies')
    return data
  }
  catch (error) {
    console.error('TMDB request failed:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch movies' })
  }
})
