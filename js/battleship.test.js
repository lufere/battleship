const battleship = require('./battleship');

const Ship = battleship.Ship;
const Gameboard = battleship.Gameboard;

test('Create ships with the correct length', () => {
  expect(Ship(1).length).toBe(1);
});

test('Max ship length is 4', () => {
  expect(Ship(999).length).toBe(4);
});

test('Min ship length is 1', () => {
  expect(Ship(-999).length).toBe(1);
});

test('Create the ship health bar', () => {
  expect(Ship(2).health).toEqual([true, true]);
});

test('Hitting the ship successfully', () => {
  let testShip = Ship(2);
  testShip.hit(1);
  expect(testShip.health).toEqual([true, false]);
});

test('Ship is not sunk until every position is hit', () => {
  let testShip = Ship(3);
  testShip.hit(0);
  testShip.hit(2);
  expect(testShip.isSunk()).toBe(false);
});

test('Ship is sunk after every position is hit', () => {
  let testShip = Ship(3);
  testShip.hit(0);
  testShip.hit(1);
  testShip.hit(2);
  expect(testShip.isSunk()).toBe(true);
});

test('Create an empty board', () => {
  let testBoard = Gameboard();
  expect(testBoard.board.every((square) => {
    return square === null
  })).toBe(true);
});

test('Place a 1 length ship on the board', () => {
  let testBoard = Gameboard();
  testBoard.place(3, 1, Ship(1), true);
  expect(testBoard.board[13]).toBe("0.0");
});

test('Place a 3 length ship on the board', () => {
  let testBoard = Gameboard();
  testBoard.place(3, 1, Ship(3), true);
  expect(testBoard.board[13]).toBe("0.0");
  expect(testBoard.board[14]).toBe("0.1");
  expect(testBoard.board[15]).toBe("0.2");
  expect(testBoard.board[16]).toBe(null);
});

test('Place a 3 length ship vertically on the board', () => {
  let testBoard = Gameboard();
  testBoard.place(3, 1, Ship(3), false);
  expect(testBoard.board[13]).toBe("0.0");
  expect(testBoard.board[23]).toBe("0.1");
  expect(testBoard.board[33]).toBe("0.2");
  expect(testBoard.board[43]).toBe(null);
});

test('Dont allow illegal placement on horizontal ships', () => {
  let testBoard = Gameboard();
  testBoard.place(8, 1, Ship(3), true);
  expect(testBoard.board.every((square) => {
    return square === null
  })).toBe(true);
});

test('Dont allow illegal placement on vertical ships', () => {
  let testBoard = Gameboard();
  testBoard.place(1, 8, Ship(3), false);
  expect(testBoard.board.every((square) => {
    return square === null
  })).toBe(true);
});

test('Place a multiple ships on the board', () => {
  let testBoard = Gameboard();
  testBoard.place(3, 1, Ship(3), true);
  testBoard.place(3, 2, Ship(3), true);
  expect(testBoard.board[13]).toBe("0.0");
  expect(testBoard.board[14]).toBe("0.1");
  expect(testBoard.board[15]).toBe("0.2");
  expect(testBoard.board[16]).toBe(null);
  expect(testBoard.board[23]).toBe("1.0");
  expect(testBoard.board[24]).toBe("1.1");
  expect(testBoard.board[25]).toBe("1.2");
  expect(testBoard.board[26]).toBe(null);
});