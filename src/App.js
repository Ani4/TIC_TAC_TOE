import React, { Component } from "react";
import Board from "./components/Board";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      p1: "player1",
      p2: "player2"
    };
  }
  render() {
    return <Board player1={this.state.player1} player2={this.state.player2} />;
  }
}

export default App;
