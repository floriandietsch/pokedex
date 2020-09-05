import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";

const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return localStorage.getItem(key);
  },
};

export default class PokemonList extends Component {
  state = {
    pokemon: null,
    limit: 20,
    url: `https://pokeapi.co/api/v2/pokemon/?limit=${this.limit}`,
    myPokemon: [],
  };

  async loadMorePokemon() {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=${this.state.limit + 8}`
    );
    this.setState({
      pokemon: res.data["results"],
      limit: this.state.limit + 8,
    });
  }

  addPokemon(pokemonIndex) {
    if (!this.state.myPokemon.includes(pokemonIndex)) {
      this.setState({
        myPokemon: this.state.myPokemon.concat(pokemonIndex),
      });
    }
  }

  removePokemon(pokemonIndex) {
    if (this.state.myPokemon.includes(pokemonIndex)) {
      var array = [...this.state.myPokemon];
      let index = array.indexOf(pokemonIndex);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({
          myPokemon: array,
        });
      }
    }
  }

  componentWillUnmount() {
    localStorage.setItem("myPokemon", JSON.stringify(this.state.myPokemon));
  }

  async componentDidMount() {
    let myPokemonList = await asyncLocalStorage.getItem("myPokemon");
    myPokemonList = JSON.parse(myPokemonList);
    if (myPokemonList === null) {
      localStorage.setItem("myPokemon", JSON.stringify(this.state.myPokemon));
      myPokemonList = await asyncLocalStorage.getItem("myPokemon");
      myPokemonList = JSON.parse(myPokemonList);
    }
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data["results"], myPokemon: myPokemonList });
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
                showButtons={true}
                myPokemon={this.state.myPokemon}
                addPokemonToMyList={(pokemonIndex) =>
                  this.addPokemon(pokemonIndex)
                }
                removePokemonFromMyList={(pokemonIndex) =>
                  this.removePokemon(pokemonIndex)
                }
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
