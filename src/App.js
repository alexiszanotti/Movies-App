import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import DetailMovie from "./components/DetailMovie";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pelicula/:id' element={<DetailMovie />} />
      </Routes>
    </div>
  );
}

export default App;
