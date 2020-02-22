import React, { Component } from "react";

class Board extends Component {
  constructor(props) {
    super();
    this.state = {
      boards: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      player1: props.player1 || "player1",
      player2: props.player2 || "player2",
      turn: "X",
      scoreBoard: [0, 0]
    };
    this.handleTurn = this.handleTurn.bind(this);
    this.isWins = this.isWins.bind(this);
  }
  isWins(boards) {
    let winningCombo = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
      [2, 4, 6]
    ];
    for (let i of winningCombo) {
      let [s1, s2, s3] = i;

      if (
        boards[s1] === boards[s2] &&
        boards[s2] === boards[s3] &&
        boards[s1] !== " " &&
        boards[s2] !== " " &&
        boards[s3] !== " "
      )
        return { s1, s2, s3 };
    }
    return false;
  }
  handleTurn(i) {
    let boards = this.state.boards;
    let b = null;
    if (boards[i] === " ") boards[i] = this.state.turn;
    else return alert("Select one of the blank titles");
    if (this.state.turn === "X") {
      this.setState({ turn: "O", boards: boards });
    } else this.setState({ turn: "X", boards: boards });
    if ((b = this.isWins(boards))) {
      return alert("wins" + this.state.turn + b.s1 + b.s2 + b.s3);
    }
  }

  render() {
    return (
      <>
        <h1>TIC TAC TOE</h1>

        <div className="p1">
          {this.state.player1} : {this.state.scoreBoard[0]}
        </div>
        <div className="p1">
          {this.state.player2} : {this.state.scoreBoard[1]}
        </div>
        <div className="board">
          {this.state.boards.map((e, i) => (
            <div key={i} className="block " onClick={() => this.handleTurn(i)}>
              {e}
            </div>
          ))}
        </div>
        <button className="clear">Game Reset</button>
        <button className="Reset">Board Reset</button>
      </>
    );
  }
}

export default Board;
