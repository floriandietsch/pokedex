import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import MyPokemon from "./components/pokemon/MyPokemon";
import Pokemon from "./components/pokemon/Pokemon";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar></NavBar>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            <Route exact path="/myPokemon/pokemon/:pokemonIndex" component={Pokemon} />
            <Route exact path="/myPokemon" component={MyPokemon} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
