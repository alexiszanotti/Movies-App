import "../less/actors.less";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ImgDefault from "../img/Img-Default-Perfil.jpg";

const apiKey = process.env.REACT_APP_API_KEY;
let lastActor;

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchActor, setSearchActor] = useState([]);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(
      `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=es-ES&query=${search}&page=1&include_adult=false`
    );
    const data = await res.json();

    if (data.results.length > 0) {
      setSearchActor(data.results);
    } else if (data.results.length === 0) {
      alert("No se encontraron resultados");
      setSearchActor([]);
    } else {
      alert("Error");
      setSearchActor([]);
    }
    setSearch("");
  };

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
    if (searchActor.length === 0) {
      getActors();
    } else {
      setActors(searchActor);
    }
  }, [searchActor]);

  return (
    <div className='actors-container'>
      <div className='search-bar2'>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Personaje...' value={search} onChange={handleChange} />
          <button type='submit'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>
      <div className='actors-list'>
        {actors?.map(actor => (
          <div className='actor' key={actor.id}>
            <Link to={`/personaje/${actor.id}`}>
              <div className='actor-img'>
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                  />
                ) : (
                  <img src={ImgDefault} alt={actor.name} />
                )}
              </div>
              <div className='actor-name'>
                <h3>{actor.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button onClick={() => window.location.reload()} className='btn-back1'>
        Volver
      </button>
    </div>
  );
};

export default Actors;
