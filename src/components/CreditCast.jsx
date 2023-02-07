import React from "react";
import { Link } from "react-router-dom";
import ImgPerfil from "../public/Img-Default-Perfil.jpg";

export const CreditCast = ({ id, index, imageIndex, profilePath, name, character }) => {
  return (
    <div key={id} className={index === imageIndex ? "slide8 activeSlide8" : "slide8"}>
      <Link to={`/personaje/${id}`}>
        <img
          className='img-perfil'
          src={profilePath ? `https://image.tmdb.org/t/p/w500/${profilePath}` : ImgPerfil}
          alt={name}
        />
      </Link>

      <div className='name-actor1'>
        <h4>{name}</h4>
        <p>{character}</p>
      </div>
    </div>
  );
};
