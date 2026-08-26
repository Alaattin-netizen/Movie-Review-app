import type { GenreListResponse, Media, PageResult, TMDBAccount } from '~~/shared/types.ts'
import { $fetch } from 'ofetch'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiOptions {
  method?: HttpMethod
  body?: any
  params?: Record<string, any>
}

async function apiFetch<T>(url: string, opts: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, params } = opts
  try {
    return await $fetch<T>(url, {
      method,
      body,
      params,
      timeout: 10000,
    })
  }
  catch (error: any) {
    console.error(error)
    const message = error?.data?.statusMessage || error?.message || 'Request failed'
    throw new Error(message)
  }
}

export function useApi() {
  const login = async (username: string, password: string) => {
    const tokenRes = await apiFetch<{ request_token: string }>('/api/auth/request-token', { method: 'POST' })
    await apiFetch('/api/auth/validate-login', {
      method: 'POST',
      body: { request_token: tokenRes.request_token, username, password },
    })
    await apiFetch('/api/auth/create-session', {
      method: 'POST',
      body: { request_token: tokenRes.request_token },
    })
  }

  const logout = () => apiFetch('/api/auth/logout', { method: 'POST' })
  const getCurrentUser = () => apiFetch<TMDBAccount>('/api/auth/me')
  const searchMovies = (q: string, page = 1) => apiFetch<PageResult<Media>>('/api/search', { params: { q, page } })
  const getPopularMovies = (page = 1) => apiFetch<PageResult<Media>>('/api/movies', { params: { page } })
  const getMovieDetails = (id: string) => apiFetch<Media>(`/api/movie/${id}`)
  const getTrendingMovies = (timeWindow: 'day' | 'week' = 'day', page = 1) =>
    apiFetch<PageResult<Media>>('/api/trending', {
      params: { time_window: timeWindow, page },
    })
  const getMovieGenres = () => apiFetch<GenreListResponse>('/api/genres')
  return {
    login,
    logout,
    getCurrentUser,
    getPopularMovies,
    getMovieDetails,
    searchMovies,
    getTrendingMovies,
    getMovieGenres,
  }
}
