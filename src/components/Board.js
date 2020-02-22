import React, { Component } from "react";

class Board extends Component {
  constructor(props) {
    super();
    this.state = {
      boards: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      player1: props.player1,
      player2: props.player2,
      turn: "X",
      scoreBoard: [0, 0],
      gameFinish: 0,
      count: 9,
      winsTiles: [],
      whowin: 0
    };
    this.handleTurn = this.handleTurn.bind(this);
    this.isWins = this.isWins.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  isWins(boards, turn) {
    let ip = 0;
    if (turn === "X") ip = -1;
    if (turn === "O") ip = 1;
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
        return this.setState({ winsTiles: [s1, s2, s3], whowin: ip });
      }
    }
  }

  handleChange(e) {
    if (e.target.getAttribute("id") === "player1")
      this.setState({ player1: e.target.value.toUpperCase() });
    if (e.target.getAttribute("id") === "player2")
      this.setState({ player2: e.target.value.toUpperCase() });
  }

  handleTurn(i) {
    if (this.state.gameFinish === 1 || this.state.count === 0) return;
    let boards = this.state.boards;

    if (boards[i] === " ") boards[i] = this.state.turn;
    else return alert("Select one of the blank tiles");
    if (this.state.turn === "X") {
      this.setState({ turn: "O", boards: boards, count: this.state.count - 1 });
    } else
      this.setState({ turn: "X", boards: boards, count: this.state.count - 1 });
    this.isWins(boards, this.state.turn);
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
        <div className="what_happens">
          {(() => {
            if (this.state.count === 0) return "Oops! Play Smartly... DRAW";
            if (this.state.whowin === -1) return this.state.player1 + " WINS";
            if (this.state.whowin === 1) return this.state.player2 + " WINS";
            if (this.state.turn === "X") return this.state.player1 + "'s turn";
            if (this.state.turn === "O") return this.state.player2 + "'s turn";
          })()}
        </div>
        <div className="score">
          <div className="p1">
            <input
              type="text"
              placeholder="player1"
              id="player1"
              onChange={e => this.handleChange(e)}
              value={this.state.player1}
            />
            : {this.state.scoreBoard[0]}
          </div>
          <div className="p1">
            <input
              type="text"
              placeholder="player2"
              id="player2"
              onChange={e => this.handleChange(e)}
              value={this.state.player2}
            />
            : {this.state.scoreBoard[1]}
          </div>
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
