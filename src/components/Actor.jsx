import { Link } from "react-router-dom";
import ImgDefault from "../assets/Img-Default-Perfil.jpg";

const Actor = ({ id, profile_path, name }) => {
  return (
    <div className='actor' key={id}>
      <Link to={`/personaje/${id}`}>
        <div className='actor-img'>
          <img
            src={profile_path ? `https://image.tmdb.org/t/p/w500/${profile_path}` : ImgDefault}
            alt={name}
          />
        </div>
        <div className='actor-name'>
          <h3>{name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default Actor;
