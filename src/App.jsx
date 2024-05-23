import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  'X' : 'Player1',
  'O' : 'Player2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  //? Since both the Gameboard and Player component neeed to know which PlYer is currently playing, we can lift the state up to the App component and pass it down to the Player component as a prop. thIS IS A GOOD EXAMPLE OF LIFTING STATE UP. And App is the ancestor component of both Player and GameBoard.

  //const [activePLayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const activePLayer = deriveActivePlayer(gameTurns);
const gameBoard = deriveGameBoard(gameTurns) //* This is for creating a deep copy

  let winner;

  const hasDraw = gameTurns.length === 9 && !winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }


  function deriveGameBoard(gameTurns){
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]; //* This is for creating a deep copy

    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
    }
    return gameBoard;

  }


  function handleSquareSelect(rowIndex, colIndex) {
    // setActivePlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      // let currentPlayer = "X";

      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //
      //? If the first player in the array is X, then the current player is O. Otherwise, the current player is X. Since we are adding the player whose turn is the current one at index 0.
      //   currentPlayer = "O";
      // }

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePLayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePLayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        <GameBoard onSelectSquare={handleSquareSelect} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
