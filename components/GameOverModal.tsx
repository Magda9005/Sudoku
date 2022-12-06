import { formatTime } from "../logic/functions";
import React from "react";
import "./GameOverModal.scss";

type GameOverModalProps = {
  onClick: () => void;
  result: number;
};

const GameOverModal: React.FC<GameOverModalProps> = ({ onClick, result }) => (
  <div className="gameOverModal">
    <h2>Gratulacje! Rozwiązałeś sudoku</h2>
    <p> Twój czas to: {formatTime(result)}</p>
    <button className="newGameBtn" onClick={onClick}>
      Nowa gra
    </button>
  </div>
);

export default GameOverModal;
