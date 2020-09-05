import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";

export default class pokemonList extends Component {
  state = {
    pokemon: null,
    limit: 20,
    url: `https://pokeapi.co/api/v2/pokemon/?limit=${this.limit}`,
  };

  async loadMorePokemon() {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=${this.state.limit + 10}`
    );
    this.setState({
      pokemon: res.data["results"],
      limit: this.state.limit + 10,
    });
  }

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data["results"] });
  }

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
        <div className="col-md-12 text-center">
          <button
            type="button"
            onClick={() => this.loadMorePokemon()}
            className="btn btn-primary align-items-center"
          >
            Load More
          </button>
        </div>
      </React.Fragment>
    );
  }
}
