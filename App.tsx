import React from "react";
import { useState, useEffect, useMemo } from "react";
import { DifficultyLevel,Board } from "./constants and types/types";

import {
  prepareBoard,
  isBoardCorrectlyCompleted,
  findEmpty,  
} from "./logic/functions";
import { useTimer } from "./hooks/useTimer";
import Stopwatch from "./components/StopWatch";
import Rows from "./components/Rows";
import PauseModal from "./components/PauseModal";
import GameOverModal from "./components/GameOverModal";
import {exampleSudokuSolution} from './constants and types/constants';

export function App() {
  const [board, setBoard] = useState(() =>
    prepareBoard(exampleSudokuSolution, "easy")
  );
  const [paused, setPaused] = useState(false);
  const [editableFields, setEditableFields] = useState(() => findEmpty(board));
  const timer = useTimer();
  const [difficultyLevel, setDifficultyLevel] =
    useState<DifficultyLevel>("easy");

  const boardCompleted = useMemo(
    () => isBoardCorrectlyCompleted(board),
    [board]
  );

  useEffect(() => {
    if (boardCompleted) {
      timer.pauseTimer();
    }
  }, [board]);

  const isCellEditable = (index: number): boolean =>
    editableFields.includes(index);

  const handleChange = (index: number, value: string): void => {
    const copy = [...board];
    const parsedValue: number = parseInt(value);

    copy[index] = isNaN(parsedValue) ? "" : parsedValue;

    setBoard(copy);
  };

  const changeDifficulty = (
    board: Board,
    exampleSudokuSolution: number[],
    level
  ): ("" | number)[] => {
    let boardWithChangedDifficultyLevel: ("" | number)[] = prepareBoard(
      exampleSudokuSolution,
      level
    );
    setBoard(boardWithChangedDifficultyLevel);
    setEditableFields(findEmpty(boardWithChangedDifficultyLevel));
    timer.reset();
    handleStart();
    return board;
  };

  const handleNewGame = () =>
    changeDifficulty(board, exampleSudokuSolution, difficultyLevel);

  const handleStart = (): void => {
    timer.startTimer();
    setPaused(false);
  };

  const handlePause = (): void => {
    timer.pauseTimer();
    setPaused(true);
  };

  const handleChangeDifficulty = (difficulty: DifficultyLevel) => {
    changeDifficulty(board, exampleSudokuSolution, difficulty);
    setDifficultyLevel(difficulty);
  };

  return (
    <>
      <div className="container">
        <h1 className="header">Sudoku</h1>
        <div className="difficultyLevelAndTimerContainer">
          <div className="difficultyLevel">
            <label>Poziom trudności: </label>
            <select
              onChange={(e) => {
                handleChangeDifficulty(e.target.value);
              }}
            >
              <option value="easy">Łatwy </option>
              <option value="medium">Średni </option>
              <option value="hard">Trudny </option>
            </select>
          </div>
          <Stopwatch
            onPause={handlePause}
            onStart={handleStart}
            time={timer.time}
            isActive={timer.isActive}
          />
        </div>
        <div className="board">
          <div className={boardCompleted ? "overlay" : undefined}></div>
          {paused && <PauseModal onStart={handleStart} />}
          <table>
            <tbody>
              <Rows
                board={board}
                onChange={handleChange}
                isCellEditable={isCellEditable}
              />
            </tbody>
          </table>
        </div>
      </div>
      {boardCompleted && (
        <GameOverModal onClick={handleNewGame} result={timer.time} />
      )}
    </>
  );
}
