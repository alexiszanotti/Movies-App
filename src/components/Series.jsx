import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useFetch, useConfigCarrousel } from "./../hooks";
import Spinner from "./Spinner";
import "../less/series.less";
const apiKey = process.env.REACT_APP_API_KEY;

const Series = () => {
  const {
    data: series,
    isLoading,
    error,
  } = useFetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-ES`);

  const { imageIndex, settings } = useConfigCarrousel();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className='container4'>
      <h1>Series populares</h1>
      <div className='serie-container'>
        <Slider {...settings}>
          {series?.map(({ id, name, poster_path }, index) => (
            <div key={id} className={index === imageIndex ? "slide4 activeSlide4" : "slide4"}>
              <Link to={`/serie/${id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`${name}`} />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Series;
