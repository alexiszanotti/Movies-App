import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import DetailMovie from "./components/DetailMovie";
import DetailSerie from "./components/DetailSerie";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pelicula/:id' element={<DetailMovie />} />
        <Route path='/serie/:id' element={<DetailSerie />} />
      </Routes>
    </div>
  );
}

export default App;
