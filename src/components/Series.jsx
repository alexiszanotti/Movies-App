import { Link } from "react-router-dom";
import Poster from "../public/default_poster.jpg";
import { useFetch } from "./../hooks/useFetch";

const apiKey = process.env.REACT_APP_API_KEY;

const Series = ({ id, poster_path, name, vote_average, genre_ids, popularity, first_air_date }) => {
  const { data: genres } = useFetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=es-ES`
  );

  var genre;
  let starsTotal = 5;
  return (
    <div className='serie' key={id}>
      <Link to={`/serie/${id}`}>
        <div className='poster1'>
          <img
            src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : Poster}
            alt={name}
          />
        </div>
      </Link>
      <div className='details2'>
        <h2>{name}</h2>
        <div className='rating1'>
          <div className='stars-outer1'>
            <div
              className='stars-inner1'
              style={{ width: `${(vote_average / 2 / starsTotal) * 100}%` }}
            ></div>
          </div>
          <span>{`${vote_average / 2}/5`}</span>
        </div>
        <div className='genres1'>
          {genre_ids.length &&
            genre_ids.slice(0, 3).map(id => {
              genre = genres.genres?.find(genre => genre.id === id);
              return (
                <span key={genre?.id && genre?.id}>
                  {genre?.name && genre?.name === undefined ? "" : genre?.name}
                </span>
              );
            })}
        </div>
        <div className='info1'>
          <span>
            <i className='fas fa-thumbs-up'></i> {Math.round(popularity)}
          </span>
          <span>
            <i className='fas fa-calendar-alt'></i>{" "}
            {first_air_date && first_air_date.split("-").reverse().join("-")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Series;
