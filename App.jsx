import React from 'react';
import { useState, useEffect } from 'react';
import {
  prepareInitialBoard,
  changeBoardMedium,
  changeBoardHard,
  checkWholeBoard,
  colorSquares,
  findEmpty,
  formatTime,
  colorRows,
  colorColumns
} from './index.js';
import { useTimer } from './hooks.js';

const arr = [
  4, 9, 8, 2, 6, 3, 1, 5, 7, 1, 3, 6, 5, 7, 8, 2, 9, 4, 5, 7, 2, 4, 9, 1, 6, 8, 3, 8, 1, 9, 3, 4, 2,
  7, 6, 5, 6, 5, 3, 8, 1, 7, 9, 4, 2, 2, 4, 7, 6, 5, 9, 8, 3, 1, 7, 6, 1, 9, 3, 5, 4, 2, 8, 9, 8, 5,
  1, 2, 4, 3, 7, 6, 3, 2, 4, 7, 8, 6, 5, 1, 9
];

function StopIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </>
  );
}

function StartIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </>
  );
}

function PlayIconOnModal() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 modalIcon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </>
  );
}
// modal which shows up when we press "pause button" on a stopwatch
function PauseModal({ isStopped, onStart }) {
  return (
    <>
      {isStopped && (
        <div className="pause-modal">
          <button onClick={onStart} className="play-button">
            <PlayIconOnModal />
          </button>
        </div>
      )}
    </>
  );
}

function Stopwatch({ onPause, onStart, time, isActive }) {

  return (
    <div className="timer">
      {formatTime(time)}
      {isActive ? (
        <button className="stop-btn" onClick={onPause}>
          {' '}
          <StopIcon />
        </button>
      ) : (
        <button className="play-btn" onClick={onStart}>
          <StartIcon />
        </button>
      )}
    </div>
  );
}

function Td({ index, isHighlighted, isNotEditable, value, onSelect,onChange,isSelected }) {
  return (
    <td key={index} style={{ backgroundColor: isHighlighted ? 'lightblue' : undefined }}>
      {isNotEditable? (
        <input
          type="number"
          pattern="[0-9]{1}"
          value={value}
          onChange={(e) => {
            onChange(index, e.target.value);
          }}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 1);
          }}
          style={{
            backgroundColor: isSelected? 'lightgrey' : undefined
          }}
          onClick={() => {
            onSelect(index);
          }}
        />
      ) : (
        <div
          className="field"
          onClick={() => {
            onSelect(index);
          }}
          style={{
            backgroundColor: isSelected? 'lightgrey' : undefined
          }}>
          {value}
        </div>
      )}
    </td>
  );
}
function Rows({ board, onChange, isNotEditable }) {
  // to put color on rows/columns/squares
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  function highlightFields(j) {
    const lastRowStartIndex = 73;
    for (let i = 0; i < lastRowStartIndex; i += 9) {
      if (colorColumns(i, j, selectedIndex)) {
        return true;
      }
      if (colorRows(i, selectedIndex, j)) {
        return true;
      }
    }
    return [0, 27, 54].some((index) => colorSquares(index, selectedIndex, j));
  }

  const rows = [];
  for (let i = 0; i < board.length; i += 9) {
    const cells = [];
    for (let j = i; j < i + 9; j++) {
      cells.push(
        <Td
          key={j}
          index={j}
          isHighlighted={highlightFields(j)}
          isNotEditable={isNotEditable(j)}
          onSelect={setSelectedIndex}
          onChange={onChange}
          isSelected={board[j]===board[selectedIndex]}
          value={board[j]}
        />
      );
    }
    rows.push(<tr key={i}>{cells}</tr>);
  }
  return rows;
}

// modal which shows up when the game is over
function Modal({ isOpen, onClick, result }) {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <h2>Gratulacje! Rozwiązałeś sudoku</h2>
          <p> Twój czas to: {formatTime(result)}</p>
          <button className="new-game-btn" onClick={onClick}>
            Nowa gra
          </button>
        </div>
      )}
    </>
  );
}


export function App() {
  const [board, setBoard] = useState(() => prepareInitialBoard(arr));
  const [pause, setPause] = useState(false);
  const [editableFields, setEditableFields] = useState(findEmpty(board));
  const timer = useTimer();
  const [difficultyLevel, setDifficultyLevel] = useState('easy');

  // pause timer when the game is over
  useEffect(() => {
    if (checkWholeBoard(board)) {
      timer.pauseTimer();
    }
  }, [board]);

  function checkIfIsNotEditable(v) {
    if (editableFields.includes(v)) {
      return true;
    }
  }

  function handleChange(index, value) {
    const copy = [...board];
    copy[index] = parseInt(value);
    setBoard(copy);
  }

  function handleNewGame() {
    timer.reset();
    handleStart();
    if (difficultyLevel === 'easy') {
      let newBoard = prepareInitialBoard(arr);
      setBoard(newBoard);
      setEditableFields(findEmpty(newBoard));
    } else if (difficultyLevel === 'medium') {
      changeLevel(board, arr, changeBoardMedium);
    } else if (difficultyLevel === 'hard') {
      changeLevel(board, arr, changeBoardHard);
    }
  }

  function handleStart() {
    timer.startTimer();
    setPause(false);
  }

  function handlePause() {
    timer.pauseTimer();
    setPause(true);
  }

  function changeLevel(board, arr, func) {
    let newBoard = [...arr];
    let level = func(newBoard);
    setBoard(level);
    setEditableFields(findEmpty(level));
    timer.reset();
    handleStart();
    return board;
  }

  function handleChangeLevel(e) {
    if (e.target.value === 'medium') {
      changeLevel(board, arr, changeBoardMedium);
      setDifficultyLevel('medium');
    } else if (e.target.value === 'hard') {
      changeLevel(board, arr, changeBoardHard);
      setDifficultyLevel('hard');
    } else if (e.target.value === 'easy') {
      changeLevel(board, arr, prepareInitialBoard);
      setDifficultyLevel('easy');
    }
  }

  return (
    <>
      <div className="container">
        <div className={checkWholeBoard(board) ? 'overlay' : undefined}></div>
        <h1>Sudoku</h1>
        <div className="difficulty-timer-area">
          <div className="difficulty-level">
            <label>Poziom trudności: </label>
            <select
              onChange={(e) => {
                handleChangeLevel(e);
              }}>
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
          <PauseModal isStopped={pause} onStart={handleStart} />
          <table>
            <tbody>
              <Rows board={board} onChange={handleChange} isNotEditable={checkIfIsNotEditable} />
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={checkWholeBoard(board)} onClick={handleNewGame} result={timer.time} />
    </>
  );
}
