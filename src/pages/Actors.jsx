import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import "../less/actors.less";
import Actor from "../components/Actor";

const apiKey = process.env.REACT_APP_API_KEY;

export const Actors = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(
      `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=es-ES&query=${search}&page=1&include_adult=false`
    );
    const data = await res.json();

    if (data.results.length > 0) {
      setData(data.results);
    } else if (data.results.length === 0) {
      alert("No se encontraron resultados");
      setData([]);
    } else {
      alert("Error");
      setData([]);
    }
    setSearch("");
  };

  let pagina = 1;

  const {
    data: actors,
    isLoading,
    error,
    setData,
  } = useFetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=es-ES&page=${pagina}`
  );

  if (isLoading) return <Spinner />;

  if (error) console.log(error);
  return (
    <div className='actors-container'>
      <div className='search-bar2'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder=' Buscar Personaje...'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type='submit'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>

      <div className='actors-list'>
        {actors.length &&
          actors.map(({ id, profile_path, name }) => (
            <Actor id={id} profile_path={profile_path} name={name} />
          ))}
      </div>
      <button onClick={() => window.location.reload()} className='btn-back1'>
        Volver
      </button>
    </div>
  );
};
