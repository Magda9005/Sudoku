import { isColumnCorrectlyFilled } from '../logic/functions';
import { solvedBoard } from './fixtures/solvedBoard';


describe("check column function", () => {
    it.each([
        [solvedBoard, 0],
        [solvedBoard, 1],
        [solvedBoard, 2],
        [solvedBoard, 3],
        [solvedBoard, 4],
        [solvedBoard, 5],
        [solvedBoard, 6],
        [solvedBoard, 7],
        [solvedBoard, 8]

    ])(
        `should return true when input is: %o,%i`,
        (board, column) => {
            expect(isColumnCorrectlyFilled(board, column)).toBeTruthy();
        }
    );
});

const incorrectBoard = [
    4, 9, 8, 2, 6, 3, 1, 5, 7,
    3, 1, 6, 5, 7, 8, 2, 9, 4,
    5, 7, 9, 4, 9, 1, 6, 8, 3,
    8, 1, 9, "", 4, 2, 7, 6, 5,
    6, 5, 3, 8, 10, 7, 9, 4, 2,
    2, 4, 7, 6, 5, 0, -4, 3, 1,
    7, 6, 1, 9, 3, 5, NaN, 2, 8,
    9, 8, 5, 1, 2, 4, 3, null, 6,
    3, 2, 4, 7, 8, 6, 5, 1, 9]

describe("check column function", () => {
    it.each([
        [incorrectBoard, 0],
        [incorrectBoard, 3],
        [incorrectBoard, 4],
        [incorrectBoard, 5],
        [incorrectBoard, 6],
        [incorrectBoard, 7],
    ])(
        `should return false when input is: %o,%i`,
        (board, column) => {
            expect(isColumnCorrectlyFilled(board, column)).toBeFalsy();
        }
    );
});

