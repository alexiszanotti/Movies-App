import "../less/detailCast.less";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const DetailCast = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const { id } = useParams();
  const [cast, setCast] = useState({});
  const [credits, setCredits] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const historia = window.history;

  const handleClick = () => {
    historia.go(-1);
  };

  const getCast = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=es-ES`
      );

      if (res.status === 200) {
        const data = await res.json();
        setCast(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getActorCredits = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}&language=es-ES`
      );

      if (res.status === 200) {
        const data = await res.json();
        setCredits(data.cast);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div className='arrow7 next7' onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className='arrow7 prev7' onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const settings3 = {
    infinite: true,
    lazyLoad: false,
    speed: 500,

    slidesToShow: 8,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getCast();
    getActorCredits();
  }, [id]);

  console.log(cast);
  return (
    <div className='cast-container'>
      <section className='cast-detail'>
        <div className='cast-img'>
          <img src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} alt='' />
        </div>
        <div className='cast-info'>
          <h1>{cast.name}</h1>
          <h2>Biografía:</h2>
          <p>{cast.biography}</p>
          <h2>Nacionalidad:</h2>
          <p>{cast.place_of_birth}</p>
          <h2>Fecha de nacimiento:</h2>
          <p>{cast.birthday}</p>
        </div>
      </section>
      <section className='cast-credits'>
        <h1>Conocido por</h1>
        <div className='cast-credits-container'>
          <Slider {...settings3}>
            {credits?.map((credit, index) => (
              <div
                key={credit.id}
                className={index === imageIndex ? "slide7 activeSlide7" : "slide7"}
              >
                {credit.poster_path ? (
                  <Link to={`/pelicula/${credit.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${credit.poster_path}`} alt='' />
                  </Link>
                ) : (
                  <Link to={`/pelicula/${credit.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} alt='' />
                  </Link>
                )}
                <div className='cast-credit-info'>
                  <h2>{credit.title}</h2>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      {/* <Link to='/'> */}
      <button onClick={handleClick} className='btn-back1'>
        Volver
      </button>
      {/* </Link> */}
    </div>
  );
};

export default DetailCast;
