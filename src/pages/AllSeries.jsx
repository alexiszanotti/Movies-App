// AllSeries.jsx
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFetchSeriesQuery, useSearchSerieQuery } from "../redux/api/apiSlice";
import Spinner from "./../components/Spinner";
import SearchForm from "../components/SearchForm";
import SeriesList from "../components/SeriesList";
import "../less/allSeries.less";

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

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/series/${search.trim()}`);
  };

  const handleReturn = () => {
    if (pathname === `/series/${serie}`) {
      navigate("/series");
    } else {
      navigate("/");
    }
  };

  if (isLoading || searchIsLoading) {
    return <Spinner />;
  }

  if (error || searchError) {
    return <div>Error: {error?.message || searchError?.message}</div>;
  }

  const seriesToRender = serie !== undefined ? searchResults?.results : series?.results;

  return (
    <div className='series-container'>
      <SearchForm search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
      <SeriesList series={seriesToRender} />
      <div className='return1'>
        <span onClick={handleReturn}>Volver</span>
      </div>
    </div>
  );
};
