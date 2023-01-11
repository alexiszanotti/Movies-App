import "../less/allMovies.less";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Poster from "../img/default_poster.jpg";
import { useFetch } from "./../hooks/useFetch";
import Spinner from "./Spinner";

const AllMovies = () => {
  const [search, setSearch] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);
  const [movies, setMovies] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;
  let pagina = 2;
  let lastMovie;
  let starsTotal = 5;

  //get genres  from api
  const {
    data: genres,
    error,
    isLoading,
  } = useFetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${search}&page=1&include_adult=false`
      );
      const data = await res.json();

      if (data.results.length > 0) {
        setSearchMovie(data.results);
      } else if (data.results.length === 0) {
        alert("No se encontraron resultados");
      } else {
        alert("Error");
        setSearchMovie([]);
      }
      setSearch("");
    } catch (error) {
      console.log(error);
    }
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
      getAllMovies();
    } else {
      setMovies(searchMovie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMovie]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
  }

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
        {movies?.map(
          ({ id, poster_path, title, vote_average, popularity, release_date, genre_ids }) => (
            <div className='card' key={id}>
              <Link to={`/pelicula/${id}`}>
                <div className='poster'>
                  {poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w780/${poster_path}`} alt={title} />
                  ) : (
                    <img src={Poster} alt={title} />
                  )}
                </div>
              </Link>

              <div className='details1'>
                <h2>{title}</h2>
                <div className='rating'>
                  <div className='stars-outer'>
                    <div
                      className='stars-inner'
                      style={{ width: `${(vote_average / 2 / starsTotal) * 100}%` }}
                    ></div>
                  </div>
                  <span>{`${vote_average / 2}/5`}</span>
                </div>
                <div className='genres'>
                  {genre_ids &&
                    genre_ids.slice(0, 3)?.map(id => {
                      let genre = genres.genres?.find(genre => genre.id === id);

                      return (
                        <span key={genre.id && genre.id}>
                          {genre.name && genre.name === undefined ? "" : genre.name}
                        </span>
                      );
                    })}
                </div>

                <div className='info'>
                  <span>
                    <i className='fas fa-thumbs-up'></i> {Math.round(popularity)}
                  </span>
                  <span>
                    <i className='fas fa-calendar-alt'></i>{" "}
                    {release_date && release_date.split("-").reverse().join("-")}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className='return'>
        <Link to='/'>
          <span>Volver</span>
        </Link>
      </div>
    </div>
  );
};

export default AllMovies;
