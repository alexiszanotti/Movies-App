import "../less/allSeries.less";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const apiKey = process.env.REACT_APP_API_KEY;
let lastSerie;

const AllSeries = () => {
  const [series, setSeries] = useState([]);

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

  let pagina = 2;
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
    getAllSeries();
  }, []);

  return (
    <div className='allSeries'>
      {series.map(serie => (
        <div className='serie' key={serie.id}>
          <Link to={`/serie/${serie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} />
          </Link>
          <h3>{serie.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default AllSeries;
