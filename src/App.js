import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokeDetails from "./pages/PokeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />

        <Route element={<PokeDetails />} path="/detail/:id" />
        <Route element={<PokeDetails />} path="/base-stats/:id" />
        <Route element={<PokeDetails />} path="/evolution/:id" />
        <Route element={<PokeDetails />} path="/moves/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
