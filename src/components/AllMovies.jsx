import "../less/allMovies.less";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const apiKey = process.env.REACT_APP_API_KEY;
let lastMovie;

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

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
        const movies = document.querySelectorAll(".allMovies .movie");
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
    getAllMovies();
  }, []);

  return (
    <div className='allMovies'>
      {movies.map(movie => (
        <div className='movie' key={movie.id}>
          <Link to={`/pelicula/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </Link>
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default AllMovies;
