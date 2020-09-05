import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Sprite = styled.img`
  width: 8em;
  height: 8em;
  display: none;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    toManyRequests: false,
    linkText: "",
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    this.setState({
      name,
      imageUrl,
      pokemonIndex,
    });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <Card className="card">
          <h5 className="card-header">
            {this.state.pokemonIndex}
            {this.props.showButtons ? (
              <div className="float-right">
                {!this.props.myPokemon.includes(this.state.pokemonIndex) ? (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      this.props.addPokemonToMyList(this.state.pokemonIndex)
                    }
                  >
                    Add
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      this.props.removePokemonFromMyList(
                        this.state.pokemonIndex
                      )
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            ) : null}
          </h5>
          <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })}
              src={this.state.imageUrl}
              style={
                this.state.toManyRequests
                  ? { display: "none" }
                  : this.state.imageLoading
                  ? null
                  : { display: "block" }
              }
            ></Sprite>
            {this.state.toManyRequests ? (
              <h6 className="max-auto">
                <span className="badge badge-danger mt-2">
                  To many requests
                </span>
              </h6>
            ) : null}
            <div className="card-body mx-auto">
              <h6 className="card-title">
                {this.state.name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (firstOrLastName) =>
                      firstOrLastName.charAt(0).toUpperCase() +
                      firstOrLastName.substring(1)
                  )
                  .join(" ")}
              </h6>
            </div>
          </StyledLink>
        </Card>
      </div>
    );
  }
}
