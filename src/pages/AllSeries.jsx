/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Series from "../components/Series";
import "../less/allSeries.less";
import { useFetchSeriesQuery, useSearchSerieQuery } from "../redux/api/apiSlice";
import Spinner from "./../components/Spinner";

export const AllSeries = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { serie } = useParams();
  const { pathname } = useLocation();

  const { data: series, error, isLoading } = useFetchSeriesQuery();

  const {
    data: searchResults,
    error: searchError,
    isLoading: searchIsLoading,
  } = useSearchSerieQuery(serie !== undefined ? serie : null);

  if (isLoading || searchIsLoading) {
    return <Spinner />;
  }

  if (error || searchError) {
    console.log(error);
  }

  const handleSubmit = () => {
    navigate(`/series/${search.trim()}`);
  };

  return (
    <div className='series-container'>
      <div className='search-bar1 '>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Serie...'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type='submit'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>
      <div className='allSeries'>
        {searchResults.results.length > 0 &&
          searchResults.results.map(
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
        {series.results.length &&
          searchResults.results.length === 0 &&
          series.results.map(
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
        <span
          onClick={() => {
            if (pathname === `/series/${serie}`) {
              navigate("/series");
            } else {
              navigate("/");
            }
          }}
        >
          Volver
        </span>
      </div>
    </div>
  );
};
