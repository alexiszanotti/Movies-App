import imagenHome from "../public/Img-Home.jpg";
import Movies from "../components/Movies";
import Series from "../components/Series";
import "../less/home.less";

export const Home = () => {
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
