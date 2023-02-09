import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "reactstrap";
import classes from "../styles/pokemon.module.css";

export default function Pokemon({ pokemon }) {
  const navigate = useNavigate();
  const [pokeDetail, setPokeDetail] = useState({});

  const getPokeDetail = async (url) => {
    try {
      const res = await axios.get(url);
      setPokeDetail(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onPokemonClick = () => {
    navigate(`/detail/${pokeDetail?.id}`);
  };

  const formatText = (text) => {
    return text[0].toUpperCase() + text.slice(1);
  };

  useEffect(() => {
    if (pokemon?.url) {
      getPokeDetail(pokemon.url);
    }
  }, [pokemon]);

  return (
    <Card className={classes.pokemon} onClick={onPokemonClick}>
      <div className={classes.wrapper}>
        <h3>{formatText(pokemon.name)}</h3>
        <div className={classes.types}>
          {pokeDetail?.types?.map((type) => {
            return <span key={type?.slot}>{formatText(type.type.name)}</span>;
          })}
        </div>
      </div>

      <img
        src={`https://img.pokemondb.net/sprites/home/normal/${pokemon?.name}.png`}
        alt={pokemon?.name}
      />
    </Card>
  );
}
