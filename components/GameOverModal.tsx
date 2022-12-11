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
    <p className="gameOverText">Congratulations! You've solved the Sudoku.</p>
    <p className="gameOverTimeResult"> Your time result is: <span className="timeResult">{formatTime(solutionTime)}</span></p>
    <button className="newGameBtn" onClick={onClick}>
      New game
    </button>
  </div>
);

export default GameOverModal;
