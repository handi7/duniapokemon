import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import About from "../components/About";
import Stats from "../components/Stats";
import classes from "../styles/poke-detail.module.css";
import pokeball from "../images/pokeball.png";
import Moves from "../components/Moves";
import { BsChevronLeft } from "react-icons/bs";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function PokeDetails() {
  const { id } = useParams();
  const pathname = window.location.pathname;
  const query = useQuery();
  const page = query.get("page");

  const navigate = useNavigate();

  const [pokeDetail, setPokeDetail] = useState({});

  const getPokeDetail = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/pokemon/${id}/`
      );
      setPokeDetail(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatText = (text) => {
    if (text) {
      return text[0].toUpperCase() + text.slice(1);
    }
  };

  useEffect(() => {
    if (id) {
      getPokeDetail(+id);
    }
  }, [id]);

  return (
    <Container>
      <div className={classes.container}>
        <div>
          <button
            className="primary_btn m-2"
            onClick={() => navigate(`/?page=${+page}`)}
          >
            <BsChevronLeft /> back
          </button>
          <h1>{formatText(pokeDetail?.name)}</h1>
          <div className={classes.types}>
            {pokeDetail?.types?.map((type) => {
              return <span key={type.slot}>{formatText(type.type.name)}</span>;
            })}
          </div>
        </div>

        <div className={classes.detail}>
          <ul className={classes.tab_container}>
            <li
              className={` ${
                pathname.includes("/detail") ? classes.tab_active : classes.tab
              }`}
            >
              <Link to={`/detail/${pokeDetail?.id}/?page=${page}`}>
                <span>About</span>
              </Link>
            </li>

            <li
              className={` ${
                pathname.includes("/base-stats")
                  ? classes.tab_active
                  : classes.tab
              }`}
            >
              <Link to={`/base-stats/${pokeDetail?.id}/?page=${page}`}>
                <span>Base Stats</span>
              </Link>
            </li>

            <li
              className={` ${
                pathname.includes("/evolution")
                  ? classes.tab_active
                  : classes.tab
              }`}
            >
              <Link to={`/evolution/${pokeDetail?.id}/?page=${page}`}>
                <span>Evolution</span>
              </Link>
            </li>

            <li
              className={` ${
                pathname.includes("/moves") ? classes.tab_active : classes.tab
              }`}
            >
              <Link to={`/moves/${pokeDetail?.id}/?page=${page}`}>
                <span>Moves</span>
              </Link>
            </li>
          </ul>

          <div className={classes.frame}>
            {pathname?.includes("/detail") && <About data={pokeDetail} />}
            {pathname?.includes("/base-stats") && (
              <Stats stats={pokeDetail?.stats} />
            )}
            {pathname?.includes("/moves") && (
              <Moves moves={pokeDetail?.moves} />
            )}
          </div>
        </div>

        <img className={classes.pokeball} src={pokeball} alt="pokeball" />

        <img
          className={classes.pokemon}
          src={`${process.env.REACT_APP_IMG_URL}/${pokeDetail?.name}.png`}
          alt={pokeDetail?.name}
        />
      </div>
    </Container>
  );
}
