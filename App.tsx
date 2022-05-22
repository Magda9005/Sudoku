import React, { FunctionComponent } from "react";
import { useState, useEffect } from "react";
import { NumberLiteralType } from "typescript";
import {
	prepareBoard,
	isBoardCorrectlyCompleted,
	findEmpty,
	formatTime,
	isCellHighlighted,
	DifficultyLevel,
	Board,
	exampleSudokuSolution,
} from "./functions";
import { useTimer } from "./hooks";
import { StopIcon, PlayIconOnModal, StartIcon } from "./icons";

type PauseModalProps = {
	isStopped: boolean;
	onStart: () => void;
};

const PauseModal: React.FC<PauseModalProps> = ({ isStopped, onStart }) => (
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
}) => (
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
type TdProps = {
	index: number;
	isHighlighted: boolean;
	isDisabled: boolean;
	value: number | string;
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
}) => (
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
					e.target.value = Math.max(1, parseInt(e.target.value, 10))
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

type RowsProps = {
	board: (number | string)[];
	onChange: (index: number, value: string) => void;
	isDisabled: (index: number) => boolean;
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
}) => (
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

export function App() {
	const [board, setBoard] = useState(() =>
		prepareBoard(exampleSudokuSolution, "easy")
	);
	const [paused, setPaused] = useState(false);
	const [editableFields, setEditableFields] = useState(() => findEmpty(board));
	const timer = useTimer();
	const [difficultyLevel, setDifficultyLevel] =
		useState<DifficultyLevel>("easy");

	const boardCorrectlyCompleted = isBoardCorrectlyCompleted(board);

	useEffect(() => {
		if (boardCorrectlyCompleted) {
			timer.pauseTimer();
		}
	}, [board]);

	const isDisabled = (index: number): boolean => editableFields.includes(index);

	const handleChange = (index: number, value: string): void => {
		const copy = [...board];
		const parsedValue: number = parseInt(value);

		copy[index] = isNaN(parsedValue) ? "" : parsedValue;

		setBoard(copy);
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

	const changeDifficulty = (
		board: Board,
		exampleSudokuSolution: number[],
		level
	): ("" | number)[] => {
		let difficulty: ("" | number)[] = prepareBoard(
			exampleSudokuSolution,
			level
		);
		setBoard(difficulty);
		setEditableFields(findEmpty(difficulty));
		timer.reset();
		handleStart();
		return board;
	};

	const handleChangeDifficulty = (difficulty: DifficultyLevel) => {
		changeDifficulty(board, exampleSudokuSolution, difficulty);
		setDifficultyLevel(difficulty);
	};

	return (
		<>
			<div className="container">
				<div className={boardCorrectlyCompleted ? "overlay" : undefined}></div>
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
				isOpen={boardCorrectlyCompleted}
				onClick={handleNewGame}
				result={timer.time}
			/>
		</>
	);
}
