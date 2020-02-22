import React, { Component } from "react";

class Board extends Component {
  constructor(props) {
    super();
    this.state = {
      boards: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      player1: props.player1 || "player1",
      player2: props.player2 || "player2",
      turn: "X",
      scoreBoard: [0, 0],
      gameFinish: 0,
      count: 9,
      winsTiles: []
    };
    this.handleTurn = this.handleTurn.bind(this);
    this.isWins = this.isWins.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.resetGame = this.resetGame.bind(this);
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
      ) {
        this.setState({ gameFinish: 1 });
        if (this.state.turn === "X")
          this.setState({
            scoreBoard: [this.state.scoreBoard[0] + 1, this.state.scoreBoard[1]]
          });
        else
          this.setState({
            scoreBoard: [this.state.scoreBoard[0], this.state.scoreBoard[1] + 1]
          });
        return this.setState({ winsTiles: [s1, s2, s3] });
      }
    }
    return false;
  }
  handleTurn(i) {
    if (this.state.gameFinish === 1 || this.state.count === 0) return;
    let boards = this.state.boards;

    if (boards[i] === " ") boards[i] = this.state.turn;
    else return alert("Select one of the blank titles");
    if (this.state.turn === "X") {
      this.setState({ turn: "O", boards: boards, count: this.state.count - 1 });
    } else
      this.setState({ turn: "X", boards: boards, count: this.state.count - 1 });
    if (this.isWins(boards)) {
      return alert("wins" + this.state.winsTiles);
    }
  }
  resetBoard() {
    this.setState({
      boards: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      gameFinish: 0,
      count: 9,
      winsTiles: []
    });
  }
  resetGame() {
    this.resetBoard();
    this.setState({
      turn: "X",
      scoreBoard: [0, 0]
    });
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
            <div
              key={i}
              className={`block ${(() => {
                if (this.state.winsTiles.includes(i)) return "wins";
              })()}`}
              onClick={() => this.handleTurn(i)}
            >
              {e}
            </div>
          ))}
        </div>

        <div className="buttons">
          <button className="Reset" onClick={this.resetBoard}>
            New Board
          </button>
          <button className="clear" onClick={this.resetGame}>
            New Game
          </button>
        </div>
      </>
    );
  }
}

export default Board;
