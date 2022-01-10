import "../less/actors.less";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const apiKey = process.env.REACT_APP_API_KEY;
let lastActor;

const Actors = () => {
  const [actors, setActors] = useState([]);

  let observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pagina++;
          getActors();
        }
      });
    },
    {
      threshold: 1.0,
      rootMargin: "0px 0px 200px 0px",
    }
  );

  let pagina = 1;

  const getActors = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=es-ES&page=${pagina}`
      );

      if (data.status === 200) {
        const resultado = await data.json();

        setActors(oldActors => [...oldActors, ...resultado.results]);

        if (lastActor) {
          observer.unobserve(lastActor);
        }
        const actors = document.querySelectorAll(".actors-container .actor");
        lastActor = actors[actors.length - 1];
        observer.observe(lastActor);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActors();
  }, []);

  return (
    <div className='actors-container'>
      <h1>Personajes populares</h1>
      {actors?.map(actor => (
        <div className='actor' key={actor.id}>
          <Link to={`/personaje/${actor.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} />
            <h3>{actor.name}</h3>
            {actor.known_for && actor.known_for?.map(movie => <p key={movie.id}>{movie.title}</p>)}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Actors;
