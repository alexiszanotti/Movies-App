import "../less/home.less";
import imagenHome from "../img/Img-Home.jpg";
import Movies from "./Movies";
import Series from "./Series";

const Home = () => {
  return (
    <div>
      <div className='main-container'>
        <main>
          <img src={imagenHome} alt='imagen-home' />
          <h1>Bienvenido</h1>
          <h2>Aquí encontrarás información sobre tus películas y series favorítas</h2>
        </main>
      </div>
      <Movies />
      <Series />
    </div>
  );
};

export default Home;
