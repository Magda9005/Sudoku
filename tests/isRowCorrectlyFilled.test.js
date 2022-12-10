import { isRowCorrectlyFilled } from '../logic/functions';
import { solvedBoard } from './fixtures/solvedBoard';


describe("check row function", () => {
    it.each([
        [solvedBoard, 0],
        [solvedBoard, 9],
        [solvedBoard, 18],
        [solvedBoard, 27],
        [solvedBoard, 36],
        [solvedBoard, 45],
        [solvedBoard, 54],
        [solvedBoard, 63],
        [solvedBoard, 72]

    ])(
        `should return true when input is: %o,%i`,
        (board, row) => {
            expect(isRowCorrectlyFilled(board, row)).toBeTruthy();
        }
    );
});



const incorrectBoard = [
    4, 4, 8, 2, 6, 3, 1, 5, 7,
    1, "", 6, 5, 7, 8, 2, 9, 4,
    5, 10, 2, 4, 9, 1, 6, 8, 3,
    8, 0, 9, 3, 4, 2, 7, 6, 5,
    6, null, 3, 8, 1, 7, 9, 4, 2,
    2, 4, 7, 6, 5, 9, 8, 3, 1,
    7, 6, 1, 9, 3, 5, 4, 2, 8,
    9, 8, 5, 1, 2, 4, 3, 7, 6,
    3, 2, 4, 7, 8, 6, 5, 1, 9]

describe("check row function", () => {
    it.each([
        [incorrectBoard, 0],
        [incorrectBoard, 18],
        [incorrectBoard, 27],
        [incorrectBoard, 36],
        [incorrectBoard, 9],

    ])(
        `should return false when input is: %o,%i`,
        (board, row) => {
            expect(isRowCorrectlyFilled(board, row)).toBeFalsy();
        }
    );
});

