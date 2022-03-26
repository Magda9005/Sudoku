// pytania do Kubixa:-o to renderowanie zakomentowane,czemu 25 razy wykonsolowuje
// zrobione modyfikacje: czas gry wyświetlany w modalu pokazującym się po wygranej, czy można było to zrobić inaczej?, zaktualizowanie nowej gry na różnych, poziomach (wcześniej wygrywając grę na poziomie np. medium, wygrywając i klikając nowa gra wyświetlała się plansza do poziomu łatwego- stworzenie stanu przechowującego aktualny poziom gry,czy to jest dobrze?)
import React from 'react';
import { useState, useEffect } from 'react';
import {
  prepareInitialBoard,
  changeBoardMedium,
  changeBoardHard,
  checkWholeBoard,
  colorSquares,
  findEmpty,
  formatTime
} from './index.js';
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

function StartIcon(onStart) {
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

function PlayIconOnModal(){

  return(
    <>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 modalIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    </>
  )
}
// modal which shows up when we press "pause button" on a stopwatch
function PauseModal({ isStopped, onStart }) {
  return (
    <>
      {isStopped && (
        <div className="pause-modal">
          <button onClick={onStart} className="play-button"><PlayIconOnModal/></button>
        </div>
      )}
    </>
  );
}

function Stopwatch({ onPause, onStart, time, isActive, handleTime }) {
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        handleTime();
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="timer">
      {formatTime(time)}
      {!isActive ? (
        <button
          className="play-btn"
          onClick={() => {
            onStart();
          }}>
          <StartIcon />
        </button>
      ) : (
        <button
          className="stop-btn"
          onClick={() => {
            onPause();
          }}>
          {' '}
          <StopIcon />
        </button>
      )}
    </div>
  );
}

function Td({
  index,
  colorFields,
  isDefault,
  board,
  selectValue,
  selectIndex,
  selectedValue,
  handleChange
}) {
  return (
    <td key={index} style={{ backgroundColor: colorFields(index) ? 'lightblue' : undefined }}>
      {!isDefault(index) ? (
        <div
          className="field"
          onClick={() => {
            selectValue(board[index]);
            selectIndex(index);
          }}
          style={{
            backgroundColor: board[index] === selectedValue ? 'lightgrey' : undefined
          }}>
          {board[index]}
        </div>
      ) : (
        <input
          type="number"
          pattern="[0-9]{1}"
          value={board[index]}
          onChange={(e) => {
            handleChange(index, e.target.value);
          }}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 1);
          }}
          style={{
            backgroundColor: board[index] === selectedValue ? 'lightgrey' : undefined
          }}
          onClick={() => {
            selectValue(board[index]);
            selectIndex(index);
          }}
        />
      )}
    </td>
  );
}
function Rows({ board, handleChange, isDefault }) {
  // to put color on all fields containing selectedValue
  const [selectedValue, setSelectedValue] = useState(null);
  // to put color on rows/columns/squares
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  function colorRows(firstCell, index, field) {
    if (index >= firstCell && index <= firstCell + 8) {
      for (let i = 0; i < 9; i++) {
        if (
          (index - i === field && field >= firstCell && field <= firstCell + 8) ||
          (index + i === field && field >= firstCell && field <= firstCell + 8)
        ) {
          return true;
        }
      }
    }
  }

  function colorFields(j) {
    for (let i = 0; i < 73; i += 9) {
      if (selectedIndex - i === j || selectedIndex + i === j) {
        return true;
      }
      if (colorRows(i, selectedIndex, j)) {
        return true;
      }
    }
    if (colorSquares(0, selectedIndex, j)) {
      return true;
    }
    if (colorSquares(27, selectedIndex, j)) {
      return true;
    }
    if (colorSquares(54, selectedIndex, j)) {
      return true;
    }
  }
  const rows = [];
  for (let i = 0; i < board.length; i += 9) {
    const cells = [];
    for (let j = i; j < i + 9; j++) {
      cells.push(
        <Td
          index={j}
          colorFields={colorFields}
          isDefault={isDefault}
          board={board}
          selectValue={setSelectedValue}
          selectIndex={setSelectedIndex}
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
      );
    }
    rows.push(<tr key={i}>{cells}</tr>);
  }
  return rows;
}

// modal which shows up when the game is over
function Modal({ isOpen, onClick, result, handleResult, isActive }) {
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        handleResult();
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

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
  let arrCopy = [...arr];

  const [board, setBoard] = useState(prepareInitialBoard(arrCopy));
  const [pause, setPause] = useState(false);
  const [empty, setEmpty] = useState(findEmpty(board));
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [result, setResult] = useState(0);
  const [gameLevel,setGameLevel]=useState('easy')

  // zatrzymanie stopera po zakończeniu gry(po wygranej)
  useEffect(() => {
    if (checkWholeBoard(board)) {
      setIsActive(false);
    }
  });

// //  pytanie do Kubika
// // if((checkWholeBoard(board)){
//   // console.log('ok')
// }


  function handleDefault(v) {
    if (empty.includes(v)) {
      return true;
    }
  }

  function onChange(index, value) {
    setBoard(
      board.map((field, ind) => {
        if (ind === index) {
          let newNumber = parseInt(value);
          return newNumber;
        } else {
          return field;
        }
      })
    );
  }

  function handleNewGame() {
    if(gameLevel==='easy'){
      setTime(0);
      setResult(0);
      handleStart();
      let easy = [...arr];
      let b = prepareInitialBoard(easy);
      setBoard(b);
      setEmpty(findEmpty(b));
      setShowModal(false);
      setOverlayClass(null);
    } else if(gameLevel==='medium'){
      changeLevel(board, arr, changeBoardMedium);
    }else if(gameLevel==='hard'){
      changeLevel(board, arr, changeBoardHard);
    }
  }

  function handleStart() {
    setIsActive(true);
    setPause(false);
  }

  function handlePause() {
    setIsActive(false);
    setPause(true);
  }

  function changeLevel(board, arr, func) {
    let newBoard = [...arr];
    let level = func(newBoard);
    setBoard(level);
    setEmpty(findEmpty(level));
    setTime(0);
    setResult(0);
    handleStart();
    return board;
  }

  function handleChangeLevel(e) {
    if (e.target.value === 'medium') {
      changeLevel(board, arr, changeBoardMedium);
      setGameLevel('medium')
    } else if (e.target.value === 'hard') {
      changeLevel(board, arr, changeBoardHard);
      setGameLevel('hard')
    } else if (e.target.value === 'easy') {
      changeLevel(board, arr, prepareInitialBoard);
      setGameLevel('easy')

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
            time={time}
            isActive={isActive}
            handleTime={() => setTime((prevTime) => prevTime + 1)}
          />
        </div>
        <div className="board">
          <PauseModal isStopped={pause} onStart={handleStart} />
          <table>
            <tbody>
              <Rows board={board} handleChange={onChange} isDefault={handleDefault} />
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={checkWholeBoard(board)}
        onClick={handleNewGame}
        result={result}
        isActive={isActive}
        handleResult={() => setResult((prevResult) => prevResult + 1)}
      />
    </>
  );
}
