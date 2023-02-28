import { useState } from "react";

import { useFetchActorsQuery, useSearchActorQuery } from "../redux/api/apiSlice";

import Actor from "../components/Actor";
import Spinner from "../components/Spinner";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../less/actors.less";

export const Actors = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { actor } = useParams();
  const { pathname } = useLocation();

  const {
    data: searchActor,
    isLoading: searchIsLoading,
    error: searchError,
  } = useSearchActorQuery(actor !== undefined ? actor : "");

  const { data: actors, isLoading, error } = useFetchActorsQuery();

  if (isLoading || searchIsLoading) return <Spinner />;

  if (error || searchError) {
    console.log(error);
    console.log(searchError);
  }

  const handleSubmit = () => {
    navigate(`/actores/${search.trim()}`);
  };
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
        {searchActor.results.length > 0 &&
          searchActor.results.map(({ id, profile_path, name }) => (
            <Actor key={id} id={id} profile_path={profile_path} name={name} />
          ))}
      </div>

      <div className='actors-list'>
        {actors.results.length > 0 &&
          searchActor.results.length === 0 &&
          actors.results.map(({ id, profile_path, name }) => (
            <Actor key={id} id={id} profile_path={profile_path} name={name} />
          ))}
      </div>
      <button
        onClick={() => {
          if (pathname === `/actorses/${actor}`) {
            navigate("/actorses");
          } else {
            navigate("/");
          }
        }}
        className='btn-back1'
      >
        Volver
      </button>
    </div>
  );
};
