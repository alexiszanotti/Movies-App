import "../less/detailMovie.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HorizontalScroll from "react-scroll-horizontal";

const apiKey = process.env.REACT_APP_API_KEY;

const DetailMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState({});

  const getMovie = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      );
      if (res.status === 200) {
        const data = await res.json();
        setMovie(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCredits = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=es-ES`
      );

      if (res.status === 200) {
        const data = await res.json();
        setCredits(data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(credits);

  const child = { width: `20vh`, height: `100%` };
  const parent = { width: `100vh`, height: `100%` };

  useEffect(() => {
    getMovie();
    getCredits();
  }, [id]);

  return (
    <div className='container-movie'>
      <div className='detail-movie'>
        <div className='detail-image'>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className='detail-info'>
          <h1>{movie.title}</h1>
          {movie.genres &&
            movie.genres.map((genre, index) => (
              <span key={genre.id}>
                {genre.name} {index !== movie.genres.length - 1 ? "- " : ""}
              </span>
            ))}
          <p>{movie.overview}</p>
          <div className='detail-info-rating'>
            <div className='detail-info-rating-average'>
              <p>{`${movie.vote_average}/10`}</p>
              <p>Puntuación</p>
            </div>
            <div className='detail-info-rating-count'>
              <p>{movie.vote_count}</p>
              <p>Votos</p>
            </div>
          </div>
          <div className='production-companies'>
            <p>Compañías de producción:</p>
            {movie.production_companies &&
              movie.production_companies.map((company, index) => (
                <span key={company.id}>
                  {company.name} {index !== movie.production_companies.length - 1 ? ", " : ""}
                </span>
              ))}
          </div>

          <div className='detail-info-buttons'>
            <button>
              <a
                href={`https://www.youtube.com/results?search_query=${movie.title}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-youtube'></i>
              </a>
            </button>
          </div>
        </div>
      </div>
      <h2>Reparto</h2>
      <div className='detail-cast'>
        {credits.cast &&
          credits.cast.map((actor, index) => (
            <div key={actor.id} className='detail-cast-actor'>
              <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} />
              <div className='detail-cast-actor-info'>
                <h3>{actor.name}</h3>
                <p>{actor.character}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DetailMovie;
