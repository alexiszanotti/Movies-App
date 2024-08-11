import { Link } from "react-router-dom";
import Poster from "../assets/default_poster.jpg";
import { useFetchGenresQuery } from "../redux/api/apiSlice";

const Series = ({ id, poster_path, name, vote_average, genre_ids, popularity, first_air_date }) => {
  const { data } = useFetchGenresQuery();

  const genreList = data?.genres.filter(genre => genre_ids.includes(genre.id));

  const voteAverage = vote_average.toFixed(1);

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
              style={{ width: `${(vote_average / 2 / 5) * 100}%` }}
            ></div>
          </div>
          <span>{`${voteAverage / 2}/5`}</span>
        </div>
        <div className='genres1'>
          {genreList?.length && genreList?.map(genre => <span key={genre.id}>{genre.name}</span>)}
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
