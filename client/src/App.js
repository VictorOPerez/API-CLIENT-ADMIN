import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home/Home.jsx";
import Hotel from "./page/hotel/Hotel.jsx";
import List from "./page/list/List.jsx";
import Loguin from "./page/loguin/Loguin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Loguin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
