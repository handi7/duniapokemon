import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Pokemon from "../components/Pokemon";
import classes from "../styles/home.module.css";
import {
  BsChevronLeft,
  BsChevronDoubleLeft,
  BsChevronRight,
  BsChevronDoubleRight,
} from "react-icons/bs";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Home() {
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;

  const [pokemons, setPokemons] = useState([]);
  const [goPage, setPage] = useState(0);
  const pageSize = 18;

  const getPokemons = async (page) => {
    try {
      const current = (page - 1) * pageSize;

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/pokemon/?offset=${current}&limit=${pageSize}`
      );
      setPokemons(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onPrev = () => {
    if (+page > 2) {
      navigate(`/?page=${+page - 1}`);
    }
  };

  const onNext = () => {
    if (+page < Math.ceil(pokemons?.count / pageSize)) {
      navigate(`/?page=${+page + 1}`);
    }
  };

  const gotoPage = (page) => {
    console.log(page);
    if (page > 0 && page <= Math.ceil(pokemons?.count / pageSize)) {
      navigate(`/?page=${page}`);
    }
  };

  useEffect(() => {
    getPokemons(+page);
    setPage(+page);
  }, [page]);

  return (
    <section>
      <Container>
        <h1 className={classes.title}>Pokedex</h1>
        <Row>
          {pokemons?.results?.map((pokemon, idx) => {
            return (
              <Col xs={6} xl={4} key={idx}>
                <Pokemon pokemon={pokemon} page={+page} />
              </Col>
            );
          })}
        </Row>

        <div className={classes.pagination}>
          <button
            className="secondary_btn"
            onClick={() => navigate(`/?page=1`)}
          >
            <BsChevronDoubleLeft />
          </button>

          <button className="secondary_btn" onClick={onPrev}>
            <BsChevronLeft /> prev
          </button>

          <span className={classes.page_status}>
            page {page} of {Math.ceil(pokemons?.count / pageSize)}
          </span>

          <button className="secondary_btn" onClick={onNext}>
            next <BsChevronRight />
          </button>

          <button
            className="secondary_btn"
            onClick={() =>
              navigate(`/?page=${Math.ceil(pokemons?.count / pageSize)}`)
            }
          >
            <BsChevronDoubleRight />
          </button>
        </div>

        <div className={classes.goto}>
          <span>Go to page </span>
          <input
            className="input"
            type="number"
            value={goPage}
            onChange={(e) => setPage(e.target.value)}
            placeholder="10"
          />
          <button className="primary_btn" onClick={() => gotoPage(goPage)}>
            Go
          </button>
        </div>
      </Container>
    </section>
  );
}
