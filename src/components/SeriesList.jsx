// SeriesList.jsx
import React from "react";
import Series from "../components/Series";

const SeriesList = ({ series }) => {
  return (
    <div className='allSeries'>
      {series.length ? (
        series.map(serie => (
          <Series
            key={serie.id}
            id={serie.id}
            poster_path={serie.poster_path}
            name={serie.name}
            vote_average={serie.vote_average}
            genre_ids={serie.genre_ids}
            popularity={serie.popularity}
            first_air_date={serie.first_air_date}
          />
        ))
      ) : (
        <div className='not-found'>No se encontraron series</div>
      )}
    </div>
  );
};

export default SeriesList;
