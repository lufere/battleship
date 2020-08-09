const Ship = (inputLength) => {
  let length;
  if(inputLength > 4){length = 4} else if(inputLength < 1){length = 1;} else {length = inputLength;}
  let health = [];
  health = Array(length).fill(true);
  const hit = (pos) =>{
    health.splice(pos, 1, false);
  }
  const isSunk = () => {
    return health.every(pos => pos == false)
  }
  return{length, isSunk, health, hit}
}

const Gameboard = () => {
  let board = Array(100).fill(null);
  let index = 0;
  let ships = [];
  
  const place = (x, y, ship, horizontal) => {
    let available;
    ships[index] = ship;
    let pos = x + (y * 10);
    horizontal ? available = 10-x : available = 10-y;
    for (let i = 0; i < ship.length; i++) {
      if(horizontal === true && available >= ship.length){
        board.splice(pos + i, 1, index);
      }
      if(horizontal === false && available >= ship.length){
        board.splice(pos + (i*10), 1, index);
      }
    }
  }

  return{place, board}
}

module.exports = {
  Ship:Ship,
  Gameboard:Gameboard
};