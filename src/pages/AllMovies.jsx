import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useFetchMoviesQuery, useSearchMovieQuery } from "../redux/api/apiSlice";
import Spinner from "../components/Spinner";
import Movies from "../components/Movies";
import "../less/allMovies.less";

export const AllMovies = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { movie } = useParams();
  const { pathname } = useLocation();

  const { data: movies, error: moviesError, isLoading: moviesIsLoading } = useFetchMoviesQuery();

  const {
    data: searchResults,
    error: searchError,
    isLoading: searchIsLoading,
  } = useSearchMovieQuery(movie !== undefined ? movie : "");

  if (searchIsLoading || moviesIsLoading) {
    return <Spinner />;
  }

  if (searchError || moviesError) {
    console.log(searchError);
    console.log(moviesError);
  }

  const handleSubmit = () => {
    navigate(`/peliculas/${search.trim()}`);
  };

  return (
    <div className='container-movies1'>
      <div className='search-bar'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Buscar película...'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type='submit'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>
      <div className='allMovies'>
        {searchResults.results.length > 0 &&
          searchResults.results.map(
            ({ id, poster_path, title, vote_average, popularity, release_date, genre_ids }) => (
              <Movies
                key={id}
                id={id}
                poster_path={poster_path}
                title={title}
                vote_average={vote_average}
                popularity={popularity}
                release_date={release_date}
                genre_ids={genre_ids}
              />
            )
          )}
        {movies.results.length &&
          searchResults.results.length === 0 &&
          movies.results.map(
            ({ id, poster_path, title, vote_average, popularity, release_date, genre_ids }) => (
              <Movies
                key={id}
                id={id}
                poster_path={poster_path}
                title={title}
                vote_average={vote_average}
                popularity={popularity}
                release_date={release_date}
                genre_ids={genre_ids}
              />
            )
          )}
      </div>
      <div className='return'>
        <span
          onClick={() => {
            if (pathname === `/peliculas/${movie}`) {
              navigate("/peliculas");
            } else {
              navigate("/");
            }
          }}
        >
          Volver
        </span>
      </div>
    </div>
  );
};
