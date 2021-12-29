import { useEffect, useState } from "react";

const Movies = () => {
  const apiKey = "7c703bc4ce83a4e6ccf422ae071636e7";

  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`
      );

      if (data.status === 200) {
        const resultado = await data.json();

        setMovies(resultado.results);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <h1>Populares</h1>

      {movies.map(movie => {
        return (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
