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
  }),
});

export const {
  useFetchMoviesQuery,
  useFetchGenresQuery,
  useFetchSeriesQuery,
  useSearchMovieQuery,
  useSearchSerieQuery,
} = apiSlice;
