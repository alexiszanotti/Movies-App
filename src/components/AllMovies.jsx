import "../less/allMovies.less";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Poster from "../img/default_poster.jpg";

const apiKey = process.env.REACT_APP_API_KEY;
let lastMovie;

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);
  const [genres, setGenres] = useState([]);

  //get genres  from api
  const getGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`
    );
    const data = await response.json();
    setGenres(data.genres);
  };

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${search}&page=1&include_adult=false`
    );
    const data = await res.json();

    if (data.results.length > 0) {
      setSearchMovie(data.results);
    } else if (data.results.length === 0) {
      alert("No se encontraron resultados");
      setSearchMovie([]);
    } else {
      alert("Error");
      setSearchMovie([]);
    }
    setSearch("");
  };

  let observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pagina++;
          getAllMovies();
        }
      });
    },
    {
      threshold: 1.0,
      rootMargin: "0px 0px 200px 0px",
    }
  );

  let pagina = 2;
  const getAllMovies = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${pagina}`
      );

      if (data.status === 200) {
        const resultado = await data.json();

        setMovies(movies => [...movies, ...resultado.results]);

        if (lastMovie) {
          observer.unobserve(lastMovie);
        }
        const movies = document.querySelectorAll(".allMovies .card");
        lastMovie = movies[movies.length - 1];
        observer.observe(lastMovie);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchMovie.length === 0) {
      getGenres();
      getAllMovies();
    } else {
      getGenres();
      setMovies(searchMovie);
    }
  }, [searchMovie]);

  return (
    <div className='container-movies1'>
      <div className='search-bar'>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Película...' value={search} onChange={handleChange} />
          <button type='submit'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>
      <div className='allMovies'>
        {movies?.map(movie => (
          <div className='card' key={movie.id}>
            <Link to={`/pelicula/${movie.id}`}>
              <div className='poster'>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <img src={Poster} alt={movie.title} />
                )}
              </div>
            </Link>

            <div className='details1'>
              <h2>
                {movie.title}
                {`(${movie.release_date.substring(0, 4)})`}
              </h2>
              <div className='raiting'>
                <i className='fas fa-star'></i>
                <i className='fas fa-star'></i>
                <i className='fas fa-star'></i>
                <i className='fas fa-star'></i>
                <i className='far fa-star'></i>
                <span>{`${movie.vote_average}/10`}</span>
              </div>
              <div className='genres'>
                {movie.genre_ids &&
                  movie.genre_ids?.map(id => {
                    const genre = genres?.find(genre => genre.id === id);
                    return (
                      <span key={genre.id} className='genres-unit'>
                        {genre.name + " "}
                      </span>
                    );
                  })}
              </div>

              <div className='info'>
                <span>
                  <i class='fas fa-thumbs-up'></i> {Math.round(movie.popularity)}
                </span>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => window.location.reload()} className='btn-back1'>
          Volver
        </button>
      </div>
    </div>
  );
};

export default AllMovies;
