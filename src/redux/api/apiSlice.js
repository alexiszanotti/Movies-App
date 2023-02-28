import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_API_KEY;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.themoviedb.org/3`,
  }),
  endpoints: builder => ({
    fetchMovies: builder.query({
      query: () => ({
        url: `/movie/popular?api_key=${apiKey}&language=es-ES`,
      }),
    }),
    fetchGenres: builder.query({
      query: () => ({
        url: `/genre/movie/list?api_key=${apiKey}&language=es-ES`,
      }),
    }),
    fetchSeries: builder.query({
      query: () => ({
        url: `/tv/popular?api_key=${apiKey}&language=es-ES`,
      }),
    }),
    fetchActors: builder.query({
      query: () => ({
        url: `/person/popular?api_key=${apiKey}&language=es-ES`,
      }),
    }),
    searchMovie: builder.query({
      query: name => ({
        url: `search/movie?api_key=${apiKey}&language=es-ES&query=${name}&page=1&include_adult=false`,
      }),
    }),
    searchSerie: builder.query({
      query: name => ({
        url: `search/tv?api_key=${apiKey}&language=es-ES&query=${name}&page=1&include_adult=false`,
      }),
    }),
    searchActor: builder.query({
      query: name => ({
        url: `search/person?api_key=${apiKey}&language=es-ES&query=${name}&page=1&include_adult=false`,
      }),
    }),
    detailActor: builder.query({
      query: id => ({
        url: `/person/${id}?api_key=${apiKey}&language=es-ES`,
      }),
    }),
    fetchCombinedCredits: builder.query({
      query: id => ({
        url: `/person/${id}/combined_credits?api_key=${apiKey}&language=es-ES`,
      }),
    }),
    detailMovie: builder.query({
      query: id => ({
        url: `/movie/${id}?api_key=${apiKey}&language=es-ES`,
      }),
    }),
    fetchCredits: builder.query({
      query: id => ({
        url: `/movie/${id}/credits?api_key=${apiKey}&language=es-ES`,
      }),
    }),
    detailSerie: builder.query({
      query: id => ({
        url: `/tv/${id}?api_key=${apiKey}&language=es-ES`,
      }),
    }),
    fetchCreditSerie: builder.query({
      query: id => ({
        url: `/tv/${id}/credits?api_key=${apiKey}&language=es-ES`,
      }),
    }),
  }),
});

export const {
  useFetchMoviesQuery,
  useFetchGenresQuery,
  useFetchSeriesQuery,
  useSearchMovieQuery,
  useSearchSerieQuery,
  useFetchActorsQuery,
  useSearchActorQuery,
  useDetailActorQuery,
  useDetailMovieQuery,
  useFetchCreditsQuery,
  useDetailSerieQuery,
  useFetchCreditSerieQuery,
  useFetchCombinedCreditsQuery,
} = apiSlice;
