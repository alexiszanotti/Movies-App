import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../less/movie.less";
import { useFetch, useConfigCarrousel } from "../hooks";
import Spinner from "./Spinner";
const apiKey = process.env.REACT_APP_API_KEY;

const PosterMovies = () => {
  const {
    data: movies,
    isLoading,
    error,
  } = useFetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`);

  const { imageIndex, settings } = useConfigCarrousel();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className='container'>
      <h1>Peliculas populares</h1>
      <div className='movie-container'>
        <Slider {...settings}>
          {movies?.map(({ id, title, poster_path }, index) => (
            <div key={id} className={index === imageIndex ? "slide activeSlide" : "slide"}>
              <Link to={`/pelicula/${id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
              </Link>
              <h4>{title}</h4>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PosterMovies;
