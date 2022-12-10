import { DifficultyLevel } from "./types";

export const exampleSudokuSolution: number[] = [
    4, 9, 8, 2, 6, 3, 1, 5, 7, 1, 3, 6, 5, 7, 8, 2, 9, 4, 5, 7, 2, 4, 9, 1, 6, 8,
    3, 8, 1, 9, 3, 4, 2, 7, 6, 5, 6, 5, 3, 8, 1, 7, 9, 4, 2, 2, 4, 7, 6, 5, 9, 8,
    3, 1, 7, 6, 1, 9, 3, 5, 4, 2, 8, 9, 8, 5, 1, 2, 4, 3, 7, 6, 3, 2, 4, 7, 8, 6,
    5, 1, 9,
  ];

export const numberOfClearedFieldsForDifficulty: Record<DifficultyLevel, number> = {
  easy: 1,
  medium: 3,
  hard: 4,
};