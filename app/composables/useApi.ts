import type { TimeWindow } from '~~/shared/types/tmdb'

export function useDiscover(type: MediaType, page = 1) {
  return useFetch<PageResult<Media>>('/api/discover', {
    params: { type, page },
    key: `discover-${type}-${page}`,
  })
}

export function useCheckMovie(id: number | string) {
  return useFetch<Media>(`/api/movie/${id}`, {
    key: `movie-${id}`,
  })
}

export function useGetGenres(type: MediaType, page = 1) {
  return useFetch<PageResult<Genre>>('/api/genres/list', {
    params: { type, page },
    key: `genres-${type}-${page}`,
  })
}

export function useGetPopularMovies(page = 1) {
  return useFetch<PageResult<Genre>>('/api/movieLists/popular', {
    params: { page },
    key: `popullarMovies-${page}`,
  })
}

export function useSearchMoviesOrShows(type: MediaType, page = 1, query: string) {
  return useFetch<PageResult<Media>>('/api/search/movie-or-show', {
    params: { type, page, query },
    key: `search-${type}-${page}-${query}`,
  })
}

export function usegetTrendingMoviesOrShows(type: MediaType, page = 1, time_window: TimeWindow) {
  return useFetch<PageResult<Media>>('/api/trending/movies-or-shows', {
    params: { type, page, time_window },
    key: `trending-${type}-${page}-${time_window}`,
  })
}
