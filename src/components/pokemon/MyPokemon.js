import React, { Component } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

const asyncLocalStorage = {
    getItem: async function (key) {
        await null;
        return localStorage.getItem(key);
    }
};

export default class MyPokemon extends Component {
  state = {
    pokemon: [],
    limit: 20,
    url: `https://pokeapi.co/api/v2/pokemon/`,
  };

  async componentDidMount() {
    let myPokemonList = await asyncLocalStorage.getItem("myPokemon");
    myPokemonList = JSON.parse(myPokemonList)
    if (myPokemonList) {
      myPokemonList.map(async (pokemonIndex) => {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`
        );

        let array = this.state.pokemon;
        array.push({
          name: res.data.name,
          url: res.data.species.url,
        });
        this.setState({
          pokemon: array,
        });
      });
    }
  }

  componentDidUpdate() {}

  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map((pokemon) => (
              <PokemonCard
                name={pokemon.name}
                url={pokemon.url}
                key={pokemon.name}
              ></PokemonCard>
            ))}
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </React.Fragment>
    );
  }
}
