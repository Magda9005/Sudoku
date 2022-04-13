const arr: number[] = [
	4, 9, 8, 2, 6, 3, 1, 5, 7, 1, 3, 6, 5, 7, 8, 2, 9, 4, 5, 7, 2, 4, 9, 1, 6, 8,
	3, 8, 1, 9, 3, 4, 2, 7, 6, 5, 6, 5, 3, 8, 1, 7, 9, 4, 2, 2, 4, 7, 6, 5, 9, 8,
	3, 1, 7, 6, 1, 9, 3, 5, 4, 2, 8, 9, 8, 5, 1, 2, 4, 3, 7, 6, 3, 2, 4, 7, 8, 6,
	5, 1, 9,
];

const board: number[] = [...arr];

type Board = ("" | number)[];

export function isCellHighlighted(
	index: number,
	selectedIndex: number
): boolean {
	const lastRowStartIndex: number = 73;
	for (let i: number = 0; i < lastRowStartIndex; i += 9) {
		if (
			colorColumns(i, index, selectedIndex) ||
			colorRows(i, selectedIndex, index)
		) {
			return true;
		}
	}
	return [0, 27, 54].some((cell) => colorSquares(cell, selectedIndex, index));
}

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

function mixAllRows(board: Board): void {
	// mixing first row of squares; indicating first and second possible index
	const firstRowInd0: number[] = [0, 9];
	const secondRowInd0: number[] = [9, 18];
	let chosenFirstIndex: number = firstRowInd0[Math.floor(Math.random() * 2)];
	let chosenSecondIndex: number = secondRowInd0[Math.floor(Math.random() * 2)];

	// calling function to mix rows first time
	swapRows(board, chosenFirstIndex, chosenSecondIndex);
	//drawing first and second index second time
	chosenFirstIndex = firstRowInd0[Math.floor(Math.random() * 2)];
	chosenSecondIndex = secondRowInd0[Math.floor(Math.random() * 2)];
	// calling function to mix rows first time
	swapRows(board, chosenFirstIndex, chosenSecondIndex);

	// mixing second row of squares
	const firstRowInd27: number[] = [27, 36];
	const secondRowInd27: number[] = [36, 45];
	chosenFirstIndex = firstRowInd27[Math.floor(Math.random() * 2)];
	chosenSecondIndex = secondRowInd27[Math.floor(Math.random() * 2)];
	swapRows(board, chosenFirstIndex, chosenSecondIndex);
	chosenFirstIndex = firstRowInd27[Math.floor(Math.random() * 2)];
	chosenSecondIndex = secondRowInd27[Math.floor(Math.random() * 2)];
	swapRows(board, chosenFirstIndex, chosenSecondIndex);

	// mixing the last row of squares
	const firstRowInd54: number[] = [54, 63];
	const secondRowInd54: number[] = [63, 72];
	chosenFirstIndex = firstRowInd54[Math.floor(Math.random() * 2)];
	chosenSecondIndex = secondRowInd54[Math.floor(Math.random() * 2)];
	swapRows(board, chosenFirstIndex, chosenSecondIndex);
	chosenFirstIndex = firstRowInd54[Math.floor(Math.random() * 2)];
	chosenSecondIndex = secondRowInd54[Math.floor(Math.random() * 2)];
	swapRows(board, chosenFirstIndex, chosenSecondIndex);
}

function mixAllColumns(board: Board): void {
	// mixing first column of squares, indicating possible first and second index
	const firstColInd0: number[] = [0, 1];
	const secondColInd0: number[] = [1, 2];
	let chosenFirstColIndex: number = firstColInd0[Math.floor(Math.random() * 2)];
	let chosenSecondColIndex: number =
		secondColInd0[Math.floor(Math.random() * 2)];

	// calling function to mix columns first time
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);
	//drawing first and second index second time
	chosenFirstColIndex = firstColInd0[Math.floor(Math.random() * 2)];
	chosenSecondColIndex = secondColInd0[Math.floor(Math.random() * 2)];
	// calling function to mix columns first time
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);
	// mixing second column of squares
	const firstColInd3: number[] = [3, 4];
	const secondColInd3: number[] = [4, 5];
	chosenFirstColIndex = firstColInd3[Math.floor(Math.random() * 2)];
	chosenSecondColIndex = secondColInd3[Math.floor(Math.random() * 2)];
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);
	chosenFirstColIndex = firstColInd3[Math.floor(Math.random() * 2)];
	chosenSecondColIndex = secondColInd3[Math.floor(Math.random() * 2)];
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);

	// mixing third column of squares
	const firstColInd6: number[] = [6, 7];
	const secondColInd6: number[] = [7, 8];
	chosenFirstColIndex = firstColInd6[Math.floor(Math.random() * 2)];
	chosenSecondColIndex = secondColInd6[Math.floor(Math.random() * 2)];
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);
	chosenFirstColIndex = firstColInd6[Math.floor(Math.random() * 2)];
	chosenSecondColIndex = secondColInd6[Math.floor(Math.random() * 2)];
	swapColumns(board, chosenFirstColIndex, chosenSecondColIndex);
}

function clearRandomFields(board: Board, quantity: number): void {
	let indexesToBeCleared: number[] = [];
	for (let i: number = 0; i < quantity; i++) {
		let randomIndex: number = Math.floor(Math.random() * 80);
		indexesToBeCleared.push(randomIndex);
	}

	for (let j: number = 0; j < indexesToBeCleared.length; j++) {
		board[indexesToBeCleared[j]] = "";
	}
}

export function prepareInitialBoard(board: Board): Board {
	let boardCopy = [...board];
	mixAllRows(boardCopy);
	mixAllColumns(boardCopy);
	clearRandomFields(boardCopy, 3);
	return boardCopy;
}

export function changeBoardMedium(board: Board) {
	mixAllRows(board);
	mixAllColumns(board);
	clearRandomFields(board, 6);
	return board;
}

export function changeBoardHard(board: Board) {
	mixAllRows(board);
	mixAllColumns(board);
	clearRandomFields(board, 56);
	return board;
}

function isRowCorrectlyFilled(board: Board, row: number): boolean {
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

// Kuba, can you check if now this is correct (comparing to the previous version)?
function isSquareCorrectlyCompleted(board: Board, index: number): boolean {
	let usedNumbers: (number | string)[] = [];
	for (let i: number = index; i < index + 19; i += 9) {
		for (let j: number = i; j < i + 3; j += i + 1) {
			if (board[j] === "") {
				return false;
			}
			if (usedNumbers.includes(board[j])) {
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

export function findEmpty(board: Board): number[] {
	let indices: number[] = [];
	for (let i: number = 0; i < board.length; i++) {
		if (board[i] === "") {
			indices.push(i);
		}
	}
	return indices;
}
