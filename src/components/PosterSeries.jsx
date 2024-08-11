import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useConfigCarrousel } from "../hooks";
import Spinner from "./Spinner";
import { useFetchSeriesQuery } from "../redux/api/apiSlice";
import DefaultPoster from "../assets/default_poster.jpg";
import "../less/series.less";

const PosterSeries = () => {
  const { data: series, error, isLoading } = useFetchSeriesQuery();

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
          {series?.results?.map(({ id, name, poster_path }, index) => (
            <div key={id} className={index === imageIndex ? "slide4 activeSlide4" : "slide4"}>
              <Link to={`/serie/${id}`}>
                <img
                  src={
                    poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : DefaultPoster
                  }
                  alt={name}
                />
              </Link>
              <h4 className='serie-name'>{name}</h4>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PosterSeries;
