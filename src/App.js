import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { DetailMovie, DetailSerie, DetailCast, AllMovies, AllSeries, Actors, Home } from "./pages";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pelicula/:id' element={<DetailMovie />} />
        <Route path='/serie/:id' element={<DetailSerie />} />
        <Route path='/personaje/:id' element={<DetailCast />} />
        <Route path='/peliculas' element={<AllMovies />} />
        <Route path='/peliculas/:movie' element={<AllMovies />} />
        <Route path='/series' element={<AllSeries />} />
        <Route path='/series/:serie' element={<AllSeries />} />
        <Route path='/personajes' element={<Actors />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
