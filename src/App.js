import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import DetailMovie from "./components/DetailMovie";
import DetailSerie from "./components/DetailSerie";
import DetailCast from "./components/DetailCast";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pelicula/:id' element={<DetailMovie />} />
        <Route path='/serie/:id' element={<DetailSerie />} />
        <Route path='/personaje/:id' element={<DetailCast />} />
      </Routes>
    </div>
  );
}

export default App;
