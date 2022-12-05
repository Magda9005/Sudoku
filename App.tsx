import React, { FunctionComponent } from "react";
import { useState, useEffect,useMemo} from "react";
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
import { useTimer } from "./hooks/useTimer";
import { StopIcon, PlayIcon, StartIcon } from "./components/icons";

type PauseModalProps = {
	onStart: () => void;
};

const PauseModal: React.FC<PauseModalProps> = ({  onStart }) => (
	
			<div className="pause-modal">
				<button onClick={onStart} className="play-button">
					<PlayIcon />
				</button>
			</div>
		)
;

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
	isCellEditable: boolean;
	value: number | string;
	onSelect: (index: number) => void;
	onChange: (index: number, value: string) => void;
	isSelected: boolean;
};

const Td: React.FC<TdProps> = ({
	index,
	isHighlighted,
	isCellEditable,
	value,
	onSelect,
	onChange,
	isSelected,
}) => (
	<td
		key={index}
		style={{ backgroundColor: isHighlighted ? "lightblue" : undefined }}>
		{isCellEditable ? (
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
	isCellEditable: (index: number) => boolean;
};

const Rows: React.FC<RowsProps> = ({ board, onChange, isCellEditable }) => {
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
					isCellEditable={isCellEditable(j)}
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
	onClick: () => void;
	result: number;
};

const FinishedGameModal: React.FC<FinishedGameModalProps> = ({
	onClick,
	result,
}) => (
	(
			<div className="modal">
				<h2>Gratulacje! Rozwiązałeś sudoku</h2>
				<p> Twój czas to: {formatTime(result)}</p>
				<button className="new-game-btn" onClick={onClick}>
					Nowa gra
				</button>
			</div>
		)
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

	const boardCompleted =useMemo(
		()=>isBoardCorrectlyCompleted(board),
		[board]
	) ;

	useEffect(() => {
		if (boardCompleted) {
			timer.pauseTimer();
		}
	}, [board]);

	const isCellEditable = (index: number): boolean => editableFields.includes(index);

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
		{boardCompleted && <FinishedGameModal
				onClick={handleNewGame}
				result={timer.time}
			/> }	
		</>
	);
}
