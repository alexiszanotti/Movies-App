/* eslint-disable react-hooks/exhaustive-deps */
import "../less/allSeries.less";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Series from "../components/Series";

export const AllSeries = () => {
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState("");
  const [searchSerie, setSearchSerie] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;
  let lastSerie;

  let pagina = 2;

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
        {series.length &&
          series.map(
            ({ id, poster_path, name, vote_average, genre_ids, popularity, first_air_date }) => (
              <Series
                key={id}
                id={id}
                poster_path={poster_path}
                name={name}
                vote_average={vote_average}
                genre_ids={genre_ids}
                popularity={popularity}
                first_air_date={first_air_date}
              />
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
