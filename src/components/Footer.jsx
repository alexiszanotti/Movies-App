import "../less/footer.less";

const Footer = () => {
  return (
    <div className='footer-container'>
      <footer>
        <span>
          <a href='https://www.linkedin.com/in/alexis-zanotti/'>
            <i className='fab fa-linkedin'></i>
          </a>
        </span>
        <span>
          <a href='https://github.com/alexiszanotti'>
            <i className='fab fa-github'></i>
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
