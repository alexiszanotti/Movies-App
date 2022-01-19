import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../less/navBar.less";

const Navbar = () => {
  //open and close navbar
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    const ul = document.getElementById("menu");
    setOpen(!open);
    open ? (ul.style.left = "-100%") : (ul.style.left = "0");
  };

  return (
    <div className='nav-container'>
      <nav>
        <li className='menu-hamburguer' onClick={() => handleOpen()}>
          <a href='#'>{open ? <i class='fas fa-times'></i> : <i class='fas fa-bars'></i>}</a>
        </li>
        <ul id='menu'>
          <NavLink to='/'>
            <li className='menu-navbar' onClick={() => handleOpen()}>
              <i className='fas fa-home'></i>
              Home
            </li>
          </NavLink>
          <NavLink to='/peliculas'>
            <li className='menu-navbar' onClick={() => handleOpen()}>
              <i className='fas fa-film'></i>
              Películas
            </li>
          </NavLink>
          <NavLink to='/series'>
            <li className='menu-navbar' onClick={() => handleOpen()}>
              <i className='fas fa-tv'></i>
              Series
            </li>
          </NavLink>
          <NavLink to='/personajes'>
            <li className='menu-navbar' onClick={() => handleOpen()}>
              <i className='fas fa-user-alt'></i>
              Personajes
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
