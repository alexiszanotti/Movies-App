import "../less/footer.less";
import img from "../assets/tmdb.svg";

const Footer = () => {
  return (
    <div className='footer-container'>
      <footer>
        <h1>Alexis Zanotti</h1>
        <h4>Desarrollador Web Full Stack</h4>

        <span>
          <a href='https://www.linkedin.com/in/alexis-zanotti/' target='_blank' rel='noreferrer'>
            <i id='linkedin' className='fab fa-linkedin'></i>
          </a>
          <a href='https://github.com/alexiszanotti' target='_blank' rel='noreferrer'>
            <i id='github' className='fab fa-github'></i>
          </a>
          <a href='https://www.behance.net/alexis-zanotti' target='_blank' rel='noreferrer'>
            <i id='behance' className='fab fa-behance'></i>
          </a>
          <a href='https://www.themoviedb.org/' target='_blank' rel='noreferrer'>
            <img src={img} alt='tmdb' />
          </a>
        </span>
        <p>© Copyright. Todos los derechos reservados </p>
      </footer>
    </div>
  );
};

export default Footer;
