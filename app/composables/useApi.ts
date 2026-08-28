export function useDiscover(type: MaybeRef<MediaType>, page = 1) {
  const params = computed(() => ({
    type: unref(type),
    page,
  }))

  return useFetch<PageResult<Media>>('/api/discover', {
    params,
    key: () => `discover-${unref(type)}-${page}`,
  })
}

export function useCheckMovie(id: number | string) {
  return useFetch<Media>(`/api/movie/${id}`, {
    key: `movie-${id}`,
  })
}

export function useCheckTv(id: number | string) {
  return useFetch<Media>(`/api/Tv-series/${id}`, {
    key: `Tv-${id}`,
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

export function useSearchMoviesOrTvs(type: MediaType, page = 1, query: string) {
  return useFetch<PageResult<Media>>('/api/search/movie-or-Tv', {
    params: { type, page, query },
    key: `search-${type}-${page}-${query}`,
  })
}

export function usegetTrendingMoviesOrTvs(type: MediaType, page = 1, time_window: TimeWindow) {
  return useFetch<PageResult<Media>>('/api/trending/movies-or-Tvs', {
    params: { type, page, time_window },
    key: `trending-${type}-${page}-${time_window}`,
  })
}

export function useGetMedia(type: MediaType, id: string, page = 1) {
  const main = useFetch<Media>(`/api/${type}/${id}`)
  const images = useFetch<{ backdrops: Image[], posters: Image[] }>(
    `/api/${type}/images?id=${id}`,
  )
  const videos = useFetch<{ results: Video[] }>(
    `/api/${type}/videos?id=${id}`,
  )
  const credits = useFetch<{ cast: Person[], crew: Person[] }>(
    `/api/${type}/credits?id=${id}`,
  )
  const reviews = useFetch<{ results: Review[] }>(
    `/api/${type}/reviews?id=${id}`,
    { params: { page } },
  )

  const data = computed<Media | null>(() => {
    if (!main.data.value)
      return null
    return {
      ...main.data.value,
      images: images.data.value ?? { backdrops: [], posters: [] },
      videos: videos.data.value ?? { results: [] },
      credits: credits.data.value ?? { cast: [], crew: [] },
      reviews: reviews.data.value ?? { results: [] },

    } as Media
  })

  const pending = computed(() => main.pending.value || images.pending.value || videos.pending.value)
  const error = computed(() => main.error.value || images.error.value || videos.error.value)

  return { data, pending, error }
}

export function useGetPerson(id: string) {
  const main = useFetch<Person>(`/api/person/${id}`)
  const images = useFetch<{ profiles: Image[] }>(
    `/api/person/images?id=${id}`,
    { default: () => ({ profiles: [] }) },
  )
  const combinedCredits = useFetch<{ cast: Media[], crew: Media[] }>(
    `/api/person/combined-credits?id=${id}`,
    { default: () => ({ cast: [], crew: [] }) },
  )

  const data = computed<Person | null>(() => {
    if (!main.data.value)
      return null
    return {
      ...main.data.value,
      images: images.data.value,
      combined_credits: combinedCredits.data.value,
    } as Person
  })

  const pending = computed(() =>
    main.pending.value || images.pending.value || combinedCredits.pending.value,
  )

  const error = computed(() =>
    main.error.value || images.error.value || combinedCredits.error.value,
  )

  return { data, pending, error }
}
