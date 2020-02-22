import React, { Component } from "react";
import Board from "./components/Board";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      p1: "Player #1",
      p2: "Player #2"
    };
  }
  render() {
    return (
      <>
        <Board player1={this.state.p1} player2={this.state.p2} />
      </>
    );
  }
}

export default App;
