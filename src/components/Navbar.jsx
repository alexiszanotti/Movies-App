import { Link } from "react-router-dom";
import "../less/navBar.less";

const Navbar = () => {
  //search bar

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
      </nav>
    </div>
  );
};

export default Navbar;
