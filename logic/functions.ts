import {Board} from '../constants and types/types';
import {clearedFieldsForDifficulty} from '../constants and types/constants';

export function isCellHighlighted(
  index: number,
  selectedIndex: number
): boolean {
  const lastRowStartIndex: number = 73;
  for (let i: number = 0; i < lastRowStartIndex; i += 9) {
    if (
      getFieldInColumnsToColor(i, index, selectedIndex) ||
      getFieldInRowsToColor(i, selectedIndex, index)
    ) {
      return true;
    }
  }

  return (
    getFieldsInSquaresToColor(index) ===
    getFieldsInSquaresToColor(selectedIndex)
  );
}

const random = (min:number, max:number):number => Math.floor(Math.random() * (max - min)) + min;

const selectRandomIndex = () => random(0, 2);
const selectRandomIndexToBeCleared = () => random(0, 81);

function swapRows(
  board: Board,
  firstRowIndices: number[],
  secondRowIndices: number[]
): void {
  let firstRowIndex = firstRowIndices[selectRandomIndex()];
  let secondRowIndex = secondRowIndices[selectRandomIndex()];
  for (let i: number = firstRowIndex; i < firstRowIndex + 9; i++) {
    if (firstRowIndex === secondRowIndex) {
      return;
    } else if (secondRowIndex === firstRowIndex + 9) {
      const x = board[i];
      board[i] = board[i + 9];
      board[i + 9] = x;
    } else if (secondRowIndex === firstRowIndex + 18) {
      const x = board[i];
      board[i] = board[i + 18];
      board[i + 18] = x;
    }
  }
}

function swapColumns(
  board: Board,
  firstColumnIndices: number[],
  secondColumnIndices: number[]
): void {
  let firstColumnIndex = firstColumnIndices[selectRandomIndex()];
  let secondColumnIndex = secondColumnIndices[selectRandomIndex()];
  for (let i: number = firstColumnIndex; i < firstColumnIndex + 73; i += 9) {
    if (firstColumnIndex === secondColumnIndex) {
      return;
    } else if (secondColumnIndex === firstColumnIndex + 1) {
      const x = board[i];
      board[i] = board[i + 1];
      board[i + 1] = x;
    } else if (secondColumnIndex === firstColumnIndex + 2) {
      const x = board[i];
      board[i] = board[i + 2];
      board[i + 2] = x;
    }
  }
}

function mixAllRows(board: Board): void {
  swapRows(board, [0, 9], [9, 18]);
  swapRows(board, [0, 9], [9, 18]);
  swapRows(board, [27, 36], [36, 45]);
  swapRows(board, [27, 36], [36, 45]);
  swapRows(board, [54, 63], [63, 72]);
  swapRows(board, [54, 63], [63, 72]);
}

function mixAllColumns(board: Board): void {
  swapColumns(board, [0, 1], [1, 2]);
  swapColumns(board, [0, 1], [1, 2]);
  swapColumns(board, [3, 4], [4, 5]);
  swapColumns(board, [3, 4], [4, 5]);
  swapColumns(board, [6, 7], [7, 8]);
  swapColumns(board, [6, 7], [7, 8]);
}

function clearRandomFields(board: Board, quantity: number): void {
  let indexesToBeCleared: number[] = [];
  for (let i: number = 0; i < quantity; i++) {
    let randomIndex: number = selectRandomIndexToBeCleared();
    indexesToBeCleared.push(randomIndex);
  }

  for (let j: number = 0; j < indexesToBeCleared.length; j++) {
    board[indexesToBeCleared[j]] = "";
  }
}



export function prepareBoard(array: Board, difficulty: string) {
  let board = [...array];
  mixAllRows(board);
  mixAllColumns(board);
  clearRandomFields(board, clearedFieldsForDifficulty[difficulty]);
  return board;
}

export function isRowCorrectlyFilled(board: Board, row: number): boolean {
  let usedNumbers: (number | "")[] = [];

  for (let i: number = row; i < row + 9; i++) {
    if (
      board[i] === "" ||
      board[i] <= 0 ||
      board[i] > 9 ||
      usedNumbers.includes(board[i])
    ) {
      return false;
    } else {
      usedNumbers.push(board[i]);
    }
  }
  return true;
}

function isColumnCorrectlyFilled(board: Board, column: number): boolean {
  let usedNumbers: ("" | number)[] = [];

  for (let i: number = column; i < column + 73; i += 9) {
    if (
      board[i] === "" ||
      board[i] <= 0 ||
      board[i] > 9 ||
      usedNumbers.includes(board[i])
    ) {
      return false;
    } else {
      usedNumbers.push(board[i]);
    }
  }
  return true;
}

function isSquareCorrectlyCompleted(board: Board, index: number): boolean {
  let usedNumbers: (number | string)[] = [];
  for (let i: number = index; i <= index + 18; i += 9) {
    for (let j: number = i; j < i + 3; j += j + 1) {
      if (board[j] === "" || usedNumbers.includes(board[j])) {
        return false;
      } else {
        usedNumbers.push(board[j]);
      }
    }
  }
  return true;
}

function checkRowOfSquares(board: Board, index: number): boolean {
  for (let i: number = index; i < index + 7; i += 3) {
    if (!isSquareCorrectlyCompleted(board, i)) {
      return false;
    }
  }
  return true;
}

export function isBoardCorrectlyCompleted(board: Board): boolean {
  for (let i: number = 0; i < 9; i++) {
    if (!isColumnCorrectlyFilled(board, i)) {
      return false;
    }
    if (!isRowCorrectlyFilled(board, i * 9)) {
      return false;
    }
  }
  for (let i = 0; i < 55; i += 27) {
    if (!checkRowOfSquares(board, i)) {
      return false;
    }
  }
  return true;
}

export function formatTime(time: number): string {
  const hour = 60;
  const seconds = `0${time % hour}`.slice(-2);
  const minute = Math.floor(time / hour);
  const minutes = `0${minute % hour}`.slice(-2);
  const hours = `0${Math.floor(time / 3600)}`.slice(-2);
  return `${hours}:${minutes}:${seconds}`;
}

function getFieldInRowsToColor(
  firstCell: number,
  index: number,
  field: number
): boolean {
  if (index >= firstCell && index <= firstCell + 8) {
    for (let i: number = 0; i < 9; i++) {
      if (
        (index - i === field && field >= firstCell && field <= firstCell + 8) ||
        (index + i === field && field >= firstCell && field <= firstCell + 8)
      ) {
        return true;
      }
    }
  }
  return false;
}

function getFieldInColumnsToColor(
  i: number,
  j: number,
  selectedIndex: number
): boolean {
  if (selectedIndex - i === j || selectedIndex + i === j) {
    return true;
  }
}

const getFieldsInSquaresToColor = (i) => {
  const squareCol = Math.floor((i % 9) / 3);
  const squareRow = Math.floor(i / 27);
  return squareCol + squareRow * 3;
};

export function findEmpty(board: Board): number[] {
  let indices: number[] = [];
  for (let i: number = 0; i < board.length; i++) {
    if (board[i] === "") {
      indices.push(i);
    }
  }
  return indices;
}
