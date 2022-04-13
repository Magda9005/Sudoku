import React, { FunctionComponent } from "react";
import { useState, useEffect } from "react";
import { NumberLiteralType } from "typescript";
import {
	prepareInitialBoard,
	changeBoardMedium,
	changeBoardHard,
	isBoardCorrectlyCompleted,
	findEmpty,
	formatTime,
	isCellHighlighted,
} from "./functions";
import { useTimer } from "./hooks";

const arr: number[] = [
	4, 9, 8, 2, 6, 3, 1, 5, 7, 1, 3, 6, 5, 7, 8, 2, 9, 4, 5, 7, 2, 4, 9, 1, 6, 8,
	3, 8, 1, 9, 3, 4, 2, 7, 6, 5, 6, 5, 3, 8, 1, 7, 9, 4, 2, 2, 4, 7, 6, 5, 9, 8,
	3, 1, 7, 6, 1, 9, 3, 5, 4, 2, 8, 9, 8, 5, 1, 2, 4, 3, 7, 6, 3, 2, 4, 7, 8, 6,
	5, 1, 9,
];

const StopIcon: React.FC = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-6 w-6"
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
);

const StartIcon: React.FC = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-6 w-6"
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
);

const PlayIconOnModal: React.FC = () => {
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
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</>
	);
};

type PauseModalProps = {
	isStopped: boolean;
	onStart: () => void;
};

const PauseModal: React.FC<PauseModalProps> = ({ isStopped, onStart }) => {
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
};

type StopwatchProps = {
	onPause: () => void;
	onStart: () => void;
	time: number;
	isActive: boolean;
};

const Stopwatch: React.FC<StopwatchProps> = ({
	onPause,
	onStart,
	time,
	isActive,
}) => {
	return (
		<div className="timer">
			{formatTime(time)}
			{isActive ? (
				<button className="stop-btn" onClick={onPause}>
					{" "}
					<StopIcon />
				</button>
			) : (
				<button className="play-btn" onClick={onStart}>
					<StartIcon />
				</button>
			)}
		</div>
	);
};

type TdProps = {
	key?: number;
	index: number;
	isHighlighted: boolean;
	isDisabled: boolean;
	value: "" | number | string;
	onSelect: (index: number) => void;
	onChange: (index: number, value: string) => void;
	isSelected: boolean;
};

const Td: React.FC<TdProps> = ({
	index,
	isHighlighted,
	isDisabled,
	value,
	onSelect,
	onChange,
	isSelected,
}) => {
	return (
		<td
			key={index}
			style={{ backgroundColor: isHighlighted ? "lightblue" : undefined }}>
			{isDisabled ? (
				<input
					type="number"
					pattern="[0-9]{1}"
					value={value}
					onChange={(e) => {
						onChange(index, e.target.value);
					}}
					onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
						e.target.value = Math.max(0, parseInt(e.target.value, 10))
							.toString()
							.slice(0, 1);
					}}
					style={{
						backgroundColor: isSelected ? "lightgrey" : undefined,
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
						backgroundColor: isSelected ? "lightgrey" : undefined,
					}}>
					{value}
				</div>
			)}
		</td>
	);
};

type RowsProps = {
	board: ("" | number | string)[];
	onChange: (index: number, value: string) => void;
	isDisabled: (parameter: number) => boolean;
};

const Rows: React.FC<RowsProps> = ({ board, onChange, isDisabled }) => {
	const [selectedIndex, setSelectedIndex] = useState(undefined);

	const rows: JSX.Element[] = [];
	for (let i: number = 0; i < board.length; i += 9) {
		const cells: JSX.Element[] = [];
		for (let j: number = i; j < i + 9; j++) {
			cells.push(
				<Td
					key={j}
					index={j}
					isHighlighted={isCellHighlighted(j, selectedIndex)}
					isDisabled={isDisabled(j)}
					onSelect={setSelectedIndex}
					onChange={onChange}
					isSelected={board[j] === board[selectedIndex]}
					value={board[j]}
				/>
			);
		}
		rows.push(<tr key={i}>{cells}</tr>);
	}
	return <>{rows}</>;
};

type FinishedGameModalProps = {
	isOpen: boolean;
	onClick: () => void;
	result: number;
};

const FinishedGameModal: React.FC<FinishedGameModalProps> = ({
	isOpen,
	onClick,
	result,
}) => {
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
};

export function App() {
	const [board, setBoard] = useState(() => prepareInitialBoard(arr));
	const [paused, setPaused] = useState(false);
	const [editableFields, setEditableFields] = useState(() => findEmpty(board));
	const timer = useTimer();
	type DifficultyLevel = "easy" | "medium" | "hard";
	const [difficultyLevel, setDifficultyLevel] =
		useState<DifficultyLevel>("easy");

	useEffect(() => {
		if (isBoardCorrectlyCompleted(board)) {
			timer.pauseTimer();
		}
	}, [board]);

	const isDisabled = (value: number): boolean => editableFields.includes(value);

	const handleChange = (index: number, value: string): void => {
		const copy = [...board];
		const parsedValue: number = parseInt(value);

		isNaN(parsedValue) ? (copy[index] = "") : (copy[index] = parsedValue);

		setBoard(copy);
	};

	const handleNewGame = (): void => {
		timer.reset();
		handleStart();
		if (difficultyLevel === "easy") {
			changeDifficulty(board, arr, prepareInitialBoard);
		} else if (difficultyLevel === "medium") {
			changeDifficulty(board, arr, changeBoardMedium);
		} else if (difficultyLevel === "hard") {
			changeDifficulty(board, arr, changeBoardHard);
		}
	};

	const handleStart = (): void => {
		timer.startTimer();
		setPaused(false);
	};

	const handlePause = (): void => {
		timer.pauseTimer();
		setPaused(true);
	};

	const changeDifficulty = (
		board: ("" | number)[],
		arr: number[],
		func
	): ("" | number)[] => {
		let newBoard: number[] = [...arr];
		let difficulty: ("" | number)[] = func(newBoard);
		setBoard(difficulty);
		setEditableFields(findEmpty(difficulty));
		timer.reset();
		handleStart();
		return board;
	};

	const handleChangeDifficulty = (difficulty) => {
		if (difficulty === "medium") {
			changeDifficulty(board, arr, changeBoardMedium);
			setDifficultyLevel("medium");
		} else if (difficulty === "hard") {
			changeDifficulty(board, arr, changeBoardHard);
			setDifficultyLevel("hard");
		} else if (difficulty === "easy") {
			changeDifficulty(board, arr, prepareInitialBoard);
			setDifficultyLevel("easy");
		}
	};

	return (
		<>
			<div className="container">
				<div
					className={
						isBoardCorrectlyCompleted(board) ? "overlay" : undefined
					}></div>
				<h1>Sudoku</h1>
				<div className="difficulty-timer-area">
					<div className="difficulty-level">
						<label>Poziom trudności: </label>
						<select
							onChange={(e) => {
								handleChangeDifficulty(e.target.value);
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
					<PauseModal isStopped={paused} onStart={handleStart} />
					<table>
						<tbody>
							<Rows
								board={board}
								onChange={handleChange}
								isDisabled={isDisabled}
							/>
						</tbody>
					</table>
				</div>
			</div>
			<FinishedGameModal
				isOpen={isBoardCorrectlyCompleted(board)}
				onClick={handleNewGame}
				result={timer.time}
			/>
		</>
	);
}
