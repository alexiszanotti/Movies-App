import { NavLink } from "react-router-dom";
import "../less/navBar.less";

const Navbar = () => {
  //search bar

  return (
    <div className='nav-container'>
      <nav>
        <ul>
          <NavLink to='/' className={({ isActive }) => (isActive ? "active" : "")}>
            <i className='fas fa-home'></i>
            <li>Home</li>
          </NavLink>
          <NavLink to='/peliculas' className={({ isActive }) => (isActive ? "active" : "")}>
            <i className='fas fa-film'></i>
            <li>Películas</li>
          </NavLink>
          <NavLink to='/series' className={({ isActive }) => (isActive ? "active" : "")}>
            <i className='fas fa-tv'></i>
            <li>Series</li>
          </NavLink>
          <NavLink to='/personajes' className={({ isActive }) => (isActive ? "active" : "")}>
            <i className='fas fa-user-alt'></i>
            <li>Personajes</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
