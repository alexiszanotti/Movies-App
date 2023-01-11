/* eslint-disable react-hooks/exhaustive-deps */
import "../less/allSeries.less";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Poster from "../img/default_poster.jpg";

const AllSeries = () => {
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState("");
  const [searchSerie, setSearchSerie] = useState([]);
  const [genres, setGenres] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;
  let lastSerie;
  var genre;
  let starsTotal = 5;
  let pagina = 2;

  const getGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=es-ES`
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=es-ES&query=${search}&page=1&include_adult=false`
    );
    const data = await res.json();

    if (data.results.length > 0) {
      setSearchSerie(data.results);
    } else if (data.results.length === 0) {
      alert("No se encontraron resultados");
      setSearchSerie([]);
    } else {
      alert("Error");
      setSearchSerie([]);
    }
    setSearch("");
  };
  let observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pagina++;
          getAllSeries();
        }
      });
    },
    {
      threshold: 1.0,
      rootMargin: "0px 0px 200px 0px",
    }
  );

  const getAllSeries = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-ES&page=${pagina}`
      );

      if (data.status === 200) {
        const resultado = await data.json();

        setSeries(series => [...series, ...resultado.results]);

        if (lastSerie) {
          observer.unobserve(lastSerie);
        }
        const series = document.querySelectorAll(".allSeries .serie");
        lastSerie = series[series.length - 1];
        observer.observe(lastSerie);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenres();
    if (searchSerie.length === 0) {
      getAllSeries();
    } else {
      setSeries(searchSerie);
    }
  }, [searchSerie]);

  return (
    <div className='series-container'>
      <div className='search-bar1 '>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Serie...' value={search} onChange={handleChange} />
          <button type='submit'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>
      <div className='allSeries'>
        {series.map(
          ({ id, poster_path, name, vote_average, genre_ids, popularity, first_air_date }) => (
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
                  {genre_ids &&
                    genre_ids.slice(0, 3).map(id => {
                      genre = genres?.find(genre => genre.id === id);
                      return (
                        <span key={genre.id && genre.id}>
                          {genre.name && genre.name === undefined ? "" : genre.name}
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
          )
        )}
      </div>
      <div className='return1'>
        <Link to='/'>
          <span>Volver</span>
        </Link>
      </div>
    </div>
  );
};

export default AllSeries;
