import { Link } from "react-router-dom";
import "../less/navBar.css";

const Navbar = () => {
  return (
    <div className='nav-container'>
      <nav>
        <ul>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/peliculas'>
            <li>Películas</li>
          </Link>
          <Link to='/series'>
            <li>Series</li>
          </Link>
          <Link to='/personajes'>
            <li>Personajes</li>
          </Link>
        </ul>
        <input type='text' placeholder='Película, serie o personaje...' />
        <i className='fas fa-search'></i>
      </nav>
    </div>
  );
};

export default Navbar;
