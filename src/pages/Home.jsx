import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Pokemon from "../components/Pokemon";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  const getPokemons = async () => {
    try {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon/");
      setPokemons(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <Container>
      <h1 className="mt-4">Pokedex</h1>
      <Row>
        {pokemons?.results?.map((pokemon, idx) => {
          return (
            <Col sm={6} lg={4} key={idx}>
              <Pokemon pokemon={pokemon} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
