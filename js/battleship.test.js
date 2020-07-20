const Ship = require('./battleship');

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





