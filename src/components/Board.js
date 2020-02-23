import React, { Component } from "react";

class Board extends Component {
  constructor(props) {
    super();
    this.state = {
      boards: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      player1: props.player1,
      player2: props.player2,
      turn: Math.random() < 0.4 ? "X" : "O",
      scoreBoard: [0, 0],
      gameFinish: 0,
      count: 9,
      winsTiles: [],
      whowin: 0,
      shakeBoard: false,
      shakeGame: false
    };
    this.handleTurn = this.handleTurn.bind(this);
    this.isWins = this.isWins.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle(e) {
    console.log(e.target.classList);
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
      winsTiles: [],
      shakeBoard: true,
      whowin: 0,
      turn: Math.random() > 0.4 ? "X" : "O"
    });
  }

  resetGame() {
    this.resetBoard();
    this.setState({
      scoreBoard: [0, 0],
      shakeGame: true
    });
  }

  render() {
    return (
      <div
        className={this.state.shakeGame ? "shake root" : "root"}
        onAnimationEnd={() => this.setState({ shakeGame: false })}
      >
        <h1>
          <span className="fa fa-times"></span>
          <span className="title">TIC-TAC-TOE</span>
          <span className="fa fa-circle-o"></span>
        </h1>

        <div className="what_happens">
          {}
          {(() => {
            if (this.state.count === 0) return "Oops! Play Smartly... DRAW";
            if (this.state.whowin === -1) return this.state.player1 + " WINS";
            if (this.state.whowin === 1) return this.state.player2 + " WINS";
            if (this.state.turn === "X")
              return this.state.player1 + "'s turn with X";
            if (this.state.turn === "O")
              return this.state.player2 + "'s turn with O";
          })()}
        </div>
        <div className="container">
          <div className="p1">
            <label htmlFor="player1">
              <span className="fa fa-user"></span>
            </label>
            <input
              maxLength="20"
              type="text"
              placeholder="player1"
              id="player1"
              onChange={e => this.handleChange(e)}
              value={this.state.player1}
            />
            <span className="points">{this.state.scoreBoard[0]}</span>
          </div>
          <div className="p2">
            <label htmlFor="player2">
              <span className="fa fa-user"></span>
            </label>
            <input
              maxLength="20"
              type="text"
              placeholder="player2"
              id="player2"
              onChange={e => this.handleChange(e)}
              value={this.state.player2}
            />
            <span className="points">{this.state.scoreBoard[1]}</span>
          </div>
          <div className="wrraper">
            <div
              className={this.state.shakeBoard ? "shake board" : "board"}
              onAnimationEnd={() => this.setState({ shakeBoard: false })}
            >
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
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
