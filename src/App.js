import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokeDetails from "./pages/PokeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<PokeDetails />} path="/detail/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
