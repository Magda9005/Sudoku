import { formatTime } from "../logic/functions";
import React from "react";
import "./GameOverModal.scss";

type GameOverModalProps = {
  onClick: () => void;
  solutionTime: number;
};

const GameOverModal: React.FC<GameOverModalProps> = ({
  onClick,
  solutionTime,
}) => (
  <div className="gameOverModal">
    <h2>Congratulations! You've solved the Sudoku.</h2>
    <p> Your time result is: {formatTime(solutionTime)}</p>
    <button className="newGameBtn" onClick={onClick}>
      New game
    </button>
  </div>
);

export default GameOverModal;
