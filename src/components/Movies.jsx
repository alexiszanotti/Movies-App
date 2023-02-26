import { Link } from "react-router-dom";
import Poster from "../public/default_poster.jpg";
import { useFetchGenresQuery } from "../redux/api/apiSlice";
import Spinner from "./Spinner";

const Movies = ({ id, poster_path, title, vote_average, genre_ids, release_date, popularity }) => {
  const { data: genres, error, isLoading } = useFetchGenresQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className='card' key={id}>
      <Link to={`/pelicula/${id}`}>
        <div className='poster'>
          <img
            src={poster_path ? `https://image.tmdb.org/t/p/w780/${poster_path}` : Poster}
            alt={title}
          />
        </div>
      </Link>

      <div className='details1'>
        <h2>{title}</h2>
        <div className='rating'>
          <div className='stars-outer'>
            <div
              className='stars-inner'
              style={{ width: `${(vote_average / 2 / 5) * 100}%` }}
            ></div>
          </div>
          <span>{`${vote_average / 2}/5`}</span>
        </div>
        <div className='genres'>
          {genre_ids &&
            genre_ids.slice(0, 3)?.map(id => {
              let genre = genres?.genres?.find(genre => genre.id === id);

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
  );
};

export default Movies;
