const arr: number[] = [
	4, 9, 8, 2, 6, 3, 1, 5, 7, 1, 3, 6, 5, 7, 8, 2, 9, 4, 5, 7, 2, 4, 9, 1, 6, 8,
	3, 8, 1, 9, 3, 4, 2, 7, 6, 5, 6, 5, 3, 8, 1, 7, 9, 4, 2, 2, 4, 7, 6, 5, 9, 8,
	3, 1, 7, 6, 1, 9, 3, 5, 4, 2, 8, 9, 8, 5, 1, 2, 4, 3, 7, 6, 3, 2, 4, 7, 8, 6,
	5, 1, 9,
];

const board: number[] = [...arr];

type Board = ("" | number)[];

function swapRows(
	board: Board,
	firstRowIndex: number,
	secondRowIndex: number
): void {
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

// funkcja do swapowania 2 kolumn
function swapColumns(
	board: Board,
	firstColumnIndex: number,
	secondColumnIndex: number
): void {
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

// mieszanie wszystkich rowsów
function mixAllRows(board: Board): void {
	// będziemy mieszać pierwszy rząd kwadratów,wyznaczamy możliwe first i secondIndexy
	const firstRowInd0: number[] = [0, 9];
	const secondRowInd0: number[] = [9, 18];
	let chosenFirstIndex: number = firstRowInd0[Math.floor(Math.random() * 2)];
	let chosenSecondIndex: number = secondRowInd0[Math.floor(Math.random() * 2)];

	// wywolujemy funkcję do mieszania rowsow pierwszy raz
	swapRows(board, chosenFirstIndex, chosenSecondIndex);
	//   losujemy drugi raz first i secondIndex
	chosenFirstIndex = firstRowInd0[Math.floor(Math.random() * 2)];
	chosenSecondIndex = secondRowInd0[Math.floor(Math.random() * 2)];
	//   wywołujemy funkcję mieszającą rowsy drugi raz
	swapRows(board, chosenFirstIndex, chosenSecondIndex);

	// mieszamy drugi rząd kwadratów
	const firstRowInd27: number[] = [27, 36];
	const secondRowInd27: number[] = [36, 45];
	chosenFirstIndex = firstRowInd27[Math.floor(Math.random() * 2)];
	chosenSecondIndex = secondRowInd27[Math.floor(Math.random() * 2)];
	swapRows(board, chosenFirstIndex, chosenSecondIndex);
	chosenFirstIndex = firstRowInd27[Math.floor(Math.random() * 2)];
	chosenSecondIndex = secondRowInd27[Math.floor(Math.random() * 2)];
	swapRows(board, chosenFirstIndex, chosenSecondIndex);

	// mieszamy ostatni rząd kwadratów
	const firstRowInd54: number[] = [54, 63];
	const secondRowInd54: number[] = [63, 72];
	chosenFirstIndex = firstRowInd54[Math.floor(Math.random() * 2)];
	chosenSecondIndex = secondRowInd54[Math.floor(Math.random() * 2)];
	swapRows(board, chosenFirstIndex, chosenSecondIndex);
	chosenFirstIndex = firstRowInd54[Math.floor(Math.random() * 2)];
	chosenSecondIndex = secondRowInd54[Math.floor(Math.random() * 2)];
	swapRows(board, chosenFirstIndex, chosenSecondIndex);
}

// mieszanie wszystkich kolumn
function mixAllColumns(board: Board): void {
	// będziemy mieszać pierwszą kolumne kwadratów,wyznaczamy możliwe first i secondIndexy
	const firstColInd0: number[] = [0, 1];
	const secondColInd0: number[] = [1, 2];
	let chosenFirstColIndex: number = firstColInd0[Math.floor(Math.random() * 2)];
	let chosenSecondColIndex: number =
		secondColInd0[Math.floor(Math.random() * 2)];

	// wywolujemy funkcję do mieszania kolumn pierwszy raz
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);
	//   losujemy drugi raz first i secondIndex
	chosenFirstColIndex = firstColInd0[Math.floor(Math.random() * 2)];
	chosenSecondColIndex = secondColInd0[Math.floor(Math.random() * 2)];
	//   wywołujemy funkcję mieszającą kolumny drugi raz
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);
	//   mieszamy drugą kolumnę kwadratów
	const firstColInd3: number[] = [3, 4];
	const secondColInd3: number[] = [4, 5];
	chosenFirstColIndex = firstColInd3[Math.floor(Math.random() * 2)];
	chosenSecondColIndex = secondColInd3[Math.floor(Math.random() * 2)];
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);
	chosenFirstColIndex = firstColInd3[Math.floor(Math.random() * 2)];
	chosenSecondColIndex = secondColInd3[Math.floor(Math.random() * 2)];
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);

	// mieszamy trzecią kolumnę kwadratów
	const firstColInd6: number[] = [6, 7];
	const secondColInd6: number[] = [7, 8];
	chosenFirstColIndex = firstColInd6[Math.floor(Math.random() * 2)];
	chosenSecondColIndex = secondColInd6[Math.floor(Math.random() * 2)];
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);
	chosenFirstColIndex = firstColInd6[Math.floor(Math.random() * 2)];
	chosenSecondColIndex = secondColInd6[Math.floor(Math.random() * 2)];
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);
}

// czyszczenie randomowych pól tablicy
function clearRandomFieldsEasy(board: Board): void {
	let indexesToBeCleared: number[] = [];
	for (let i: number = 0; i < 3; i++) {
		let randomIndex: number = Math.floor(Math.random() * 80);
		indexesToBeCleared.push(randomIndex);
	}

	for (let j: number = 0; j < indexesToBeCleared.length; j++) {
		board[indexesToBeCleared[j]] = "";
	}
}

function clearRandomFieldsMedium(board: Board): void {
	let indexesToBeCleared: number[] = [];
	for (let i: number = 0; i < 6; i++) {
		let randomIndex: number = Math.floor(Math.random() * 80);
		indexesToBeCleared.push(randomIndex);
	}

	for (let j: number = 0; j < indexesToBeCleared.length; j++) {
		board[indexesToBeCleared[j]] = "";
	}
}

function clearRandomFieldsHard(board: Board): void {
	let indexesToBeCleared: number[] = [];
	for (let i: number = 0; i < 56; i++) {
		let randomIndex: number = Math.floor(Math.random() * 80);
		indexesToBeCleared.push(randomIndex);
	}

	for (let j: number = 0; j < indexesToBeCleared.length; j++) {
		board[indexesToBeCleared[j]] = "";
	}
}

// miesza rowsy, kolumny i usuwa randomowo 62 pola
export function prepareInitialBoard(board: Board): Board {
	let boardCopy = [...board];
	mixAllRows(boardCopy);
	mixAllColumns(boardCopy);
	clearRandomFieldsEasy(boardCopy);
	return boardCopy;
}

export function changeBoardMedium(board: Board) {
	mixAllRows(board);
	mixAllColumns(board);
	clearRandomFieldsMedium(board);
	return board;
}

export function changeBoardHard(board: Board) {
	mixAllRows(board);
	mixAllColumns(board);
	clearRandomFieldsHard(board);
	return board;
}

function checkIfRowCorrectlyFilled(board: Board, row: number): boolean {
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

function checkIfColumnCorrectlyFilled(board: Board, column: number): boolean {
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

// wystarczy sprawdzić czy się nie powtarzają liczby w kwardracie bo funkcja sprawdzająca rzędy i kolumny sprawdza już czy nie ma tam innych znaków niż cyfry od 1-9

function checkIfSingleSquareCorrectlyCompleted(
	board: Board,
	index: number
): boolean {
	let usedNumbers: (number|string)[] = [];
	for (let i: number = index; i < index + 19; i += 9) {
		if (board[i] === "") {
			return false;
		}
		if (usedNumbers.includes(board[i])) {
			return false;
		} else {
			usedNumbers.push(board[i]);
		}
		if (usedNumbers.includes(board[i + 1])) {
			return false;
		} else {
			usedNumbers.push(board[i + 1]);
		}
		if (usedNumbers.includes(board[i + 2])) {
			return false;
		} else {
			usedNumbers.push(board[i + 2]);
		}
	}
	return true;
}

function checkRowOfSquares(board: Board, index: number): boolean {
	for (let i: number = index; i < index + 7; i += 3) {
		if (!checkIfSingleSquareCorrectlyCompleted(board, i)) {
			return false;
		}
	}
	return true;
}

export function checkIfWholeBoardCorrectlyCompleted(board: Board): boolean {
	for (let i: number = 0; i < 9; i++) {
		if (!checkIfColumnCorrectlyFilled(board, i)) {
			return false;
		}
		if (!checkIfRowCorrectlyFilled(board, i * 9)) {
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
	const hour: number = 60;
	const getSeconds: string = `0${time % hour}`.slice(-2);
	const minutes: number = Math.floor(time / hour);
	const getMinutes: string = `0${minutes % hour}`.slice(-2);
	const getHours: string = `0${Math.floor(time / 3600)}`.slice(-2);
	return `${getHours}:${getMinutes}:${getSeconds}`;
}

export function colorRows(
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
}

export function colorColumns(
	i: number,
	j: number,
	selectedIndex: number
): boolean {
	if (selectedIndex - i === j || selectedIndex + i === j) {
		return true;
	}
}

export function colorSquares(
	index: number,
	selectedIndex: number,
	j: number
): boolean {
	for (let i: number = index; i < index + 7; i += 3) {
		if (
			(selectedIndex === i && j < i + 21 && selectedIndex + 10 === j) ||
			(selectedIndex === i && j < i + 21 && selectedIndex + 20 === j) ||
			(selectedIndex === i && j < i + 21 && selectedIndex + 11 === j) ||
			(selectedIndex === i && j < i + 21 && selectedIndex + 19 === j)
		) {
			return true;
		}

		if (
			(selectedIndex === i + 1 && j < i + 21 && selectedIndex + 8 === j) ||
			(selectedIndex === i + 1 && j < i + 21 && selectedIndex + 17 === j) ||
			(selectedIndex === i + 1 && j < i + 21 && selectedIndex + 10 === j) ||
			(selectedIndex === i + 1 && j < i + 21 && selectedIndex + 19 === j)
		) {
			return true;
		}

		if (
			(selectedIndex === i + 2 && j < i + 21 && selectedIndex + 7 === j) ||
			(selectedIndex === i + 2 && j < i + 21 && selectedIndex + 16 === j) ||
			(selectedIndex === i + 2 && j < i + 21 && selectedIndex + 8 === j) ||
			(selectedIndex === i + 2 && j < i + 21 && selectedIndex + 17 === j)
		) {
			return true;
		}

		if (
			(selectedIndex === i + 10 && j < i + 21 && selectedIndex - 10 === j) ||
			(selectedIndex === i + 10 && j < i + 21 && selectedIndex + 10 === j) ||
			(selectedIndex === i + 10 && j < i + 21 && selectedIndex + 8 === j) ||
			(selectedIndex === i + 10 && j < i + 21 && selectedIndex - 8 === j)
		) {
			return true;
		}

		if (
			(selectedIndex === i + 9 && j < i + 21 && selectedIndex + 10 === j) ||
			(selectedIndex === i + 9 && j < i + 21 && selectedIndex + 11 === j) ||
			(selectedIndex === i + 9 && j < i + 21 && selectedIndex - 8 === j) ||
			(selectedIndex === i + 9 && j < i + 21 && selectedIndex - 7 === j)
		) {
			return true;
		}

		if (
			(selectedIndex === i + 11 && j < i + 21 && selectedIndex - 10 === j) ||
			(selectedIndex === i + 11 && j < i + 21 && selectedIndex - 11 === j) ||
			(selectedIndex === i + 11 && j < i + 21 && selectedIndex + 8 === j) ||
			(selectedIndex === i + 11 && j < i + 21 && selectedIndex + 7 === j)
		) {
			return true;
		}

		if (
			(selectedIndex === i + 18 && j < i + 21 && selectedIndex - 8 === j) ||
			(selectedIndex === i + 18 && j < i + 21 && selectedIndex - 16 === j) ||
			(selectedIndex === i + 18 && j < i + 21 && selectedIndex - 7 === j) ||
			(selectedIndex === i + 18 && j < i + 21 && selectedIndex - 17 === j)
		) {
			return true;
		}

		if (
			(selectedIndex === i + 19 && j < i + 21 && selectedIndex - 10 === j) ||
			(selectedIndex === i + 19 && j < i + 21 && selectedIndex - 19 === j) ||
			(selectedIndex === i + 19 && j < i + 21 && selectedIndex - 8 === j) ||
			(selectedIndex === i + 19 && j < i + 21 && selectedIndex - 17 === j)
		) {
			return true;
		}

		if (
			(selectedIndex === i + 20 && j < i + 21 && selectedIndex - 10 === j) ||
			(selectedIndex === i + 20 && j < i + 21 && selectedIndex - 20 === j) ||
			(selectedIndex === i + 20 && j < i + 21 && selectedIndex - 11 === j) ||
			(selectedIndex === i + 20 && j < i + 21 && selectedIndex - 19 === j)
		) {
			return true;
		}
	}
}

// function to find empty fields in a initial board
export function findEmpty(board: Board): number[] {
	let indices: number[] = [];
	for (let i: number = 0; i < board.length; i++) {
		if (board[i] === "") {
			indices.push(i);
		}
	}
	return indices;
}
