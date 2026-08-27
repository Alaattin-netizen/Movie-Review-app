<script setup lang="ts">
const { data: moviesData, pending: moviesPending, error: moviesError } = useDiscover('movie', 1)
const { data: movieData, pending: moviePending, error: movieError } = useCheckMovie(969681)
const { data: genresData, pending: genresPending, error: genresError } = useGetGenres('movie', 1)
const { data: pMoviesData, pending: pMoviesPending, error: pMoviesError } = useGetPopularMovies(1)
const { data: SearchMorSData } = useSearchMoviesOrShows('tv', 1, 'Breaking Bad')
const { data: tMovies } = usegetTrendingMoviesOrShows('movie', 1, 'day')
/*
const { data: showsData, pending: showsPending, error: showsError } = useDiscover('tv', 1)
*/
</script>

<template>
  <pre>
{{ tMovies }}
  </pre>
  <!-- <div class="w-full h-full flex flex-col justify-center gap-8 p-4">
    <section>
      <h2 class="text-2xl font-bold text-white mb-4">
        Popular Movies
      </h2>

      <div v-if="moviesPending" class="text-gray-400">
        Loading movies...
      </div>
      <div v-else-if="moviesError" class="text-red-400">
        Error: {{ moviesError.message }}
      </div>
      <UCarousel
        v-else
        v-slot="{ item }"
        loop
        arrows
        :items="moviesData?.results || []"
        :ui="{
          item: 'basis-1/3 md:basis-1/4 lg:basis-1/5',
          container: 'gap-4',
        }"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w300${item.poster_path}`"
          :alt="item.title"
          class="w-full h-56 object-cover rounded-lg"
          @error="(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=No+Image'"
        >
      </UCarousel>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-white mb-4">
        Popular TV Shows
      </h2>

      <div v-if="showsPending" class="text-gray-400">
        Loading TV shows...
      </div>
      <div v-else-if="showsError" class="text-red-400">
        Error: {{ showsError.message }}
      </div>

      <UCarousel
        v-else
        v-slot="{ item }"
        loop
        arrows
        :items="showsData?.results || []"
        :ui="{
          item: 'basis-1/3 md:basis-1/4 lg:basis-1/5',
          container: 'gap-4',
        }"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w300${item.poster_path}`"
          :alt="item.name"
          class="w-full h-56 object-cover rounded-lg"
          @error="(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=No+Image'"
        >
      </UCarousel>
    </section>
  </div> -->
</template>
