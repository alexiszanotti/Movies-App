import React from "react";
import imgPoster from "../assets/default_poster.jpg";

export const Seasons = ({ id, poster_path, name, airDate, episodeCount }) => {
  return (
    <>
      <div key={id} className='seasons-container'>
        <div className='img-container'>
          <img
            src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : imgPoster}
            alt={name}
          />
        </div>
        <div>
          <h4>{name}</h4>
          <p>Estreno: {airDate && airDate.split("-").reverse().join("-")}</p>
          <p>Episodios: {episodeCount}</p>
        </div>
      </div>
    </>
  );
};
