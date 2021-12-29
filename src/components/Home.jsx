import "../less/home.css";
import imagenHome from "../img/Img-Home.jpg";
import Movies from "./Movies";

const Home = () => {
  return (
    <div>
      <div className='main-container'>
        <main>
          <img src={imagenHome} alt='imagen-home' />
          <h1>Bienvenidos</h1>
          <h2>Aquí encontrarás linformación sobre tus Películas y Series favorítas</h2>
        </main>
      </div>
      <Movies />
    </div>
  );
};

export default Home;
