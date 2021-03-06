const Ship = (inputLength) => {
  let length;
  let horizontal;
  if(inputLength > 5){length = 5} else if(inputLength < 2){length = 2;} else {length = inputLength;}
  let health = [];
  health = Array(length).fill(true);
  const hit = (pos) =>{
    health.splice(pos, 1, false);
  }
  const isSunk = () => {
    return health.every(pos => pos == false)
  }
  return{length, isSunk, health, hit, horizontal}
}

const Gameboard = () => {
  let board = Array(100).fill(null);
  let index = 0;
  let ships = [];
  
  const getBoard = () => {
    let publicBoard = board.slice();
    return publicBoard
  }

  const clearBoard = () => {
    board = Array(100).fill(null);
    index = 0;
    ships.length = 0;
  }

  const place = (x, y, ship, horizontal) => {
    let valid = checkValidity(x, y, ship.length, horizontal);
    ship.horizontal = horizontal;
    ships[index] = ship;
    let pos = x + (y * 10);
    if(valid==true){
      if (horizontal == true){
          for (let i = 0; i < ship.length; i++) {
          let id = index.toString() + "." + i.toString();
          if(valid == true) board.splice(pos + i, 1, id);
        }
      }
      if (horizontal == false){
        for (let i = 0; i < ship.length; i++) {
          let id = index.toString() + "." + i.toString();
          if(valid == true) board.splice(pos + (i*10), 1, id);
        }
      }
      index++;
      return true
    }
  }

  const randomPlace = (ship) =>{
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);
    let horizontal = true;
    Math.floor(Math.random() * 2) == 0 ? horizontal = true: horizontal = false;
    let valid = checkValidity(randomX, randomY, ship.length, horizontal);
    if (valid == false) randomPlace(ship);
    if (valid == true) place(randomX, randomY, ship, horizontal);
  }

  const randomSetup = () =>{
    randomPlace(Ship(2));
    randomPlace(Ship(3));
    randomPlace(Ship(3));
    randomPlace(Ship(4));
    randomPlace(Ship(5));
  }

  const checkValidity = (x, y, length, horizontal) => {
    let pos = x + (y * 10);
    let available;
    horizontal ? available = 10-x : available = 10-y;
    if(available < length) return false
    for (let i = 0; i < length; i++) {
      if(horizontal==true && board[pos+i] != null) return  false;
      if(horizontal==false && board[pos+(i*10)] != null) return false;
    }
    return true;
  }

  const receiveAttack = (x, y) => {
    let pos = x + (y * 10);
    // console.log(pos);
    let square = parseFloat(board[pos]);
    // if (board[pos] != null && typeof parseFloat(board[pos]) === "number"){
    if (!isNaN(square)){
      let id = board[pos].split(".");
      // console.log(id);
      let shipNum = parseInt(id[0]);
      let shipPos = parseInt(id[1]);
      ships[shipNum].hit(shipPos);
      board.splice(pos, 1, "h");
      return true
    }
    if(board[pos] === null) {
      board.splice(pos, 1, "m");
      return true
    }
    return false
  }

  const allSunk = () => {
    let shipsDown = ships.map((ship) => {
      return ship.isSunk()
    });
    return shipsDown.every((ship) => {
      return ship === true
    });
  }

  return{place, getBoard, receiveAttack, allSunk, randomPlace, clearBoard, randomSetup, ships}
}

const Player = (gameboard, name) => {
  const attack = (player, x, y) => {
    if(Game.userTurn == true){
      player.receiveAttack(x, y);
    }
  }

  const receiveAttack = (x, y) => {
    gameboard.receiveAttack(x, y);
  }

  const receiveRandomAttack = () => {
    let valid = false;
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);
    while(valid === false){
      valid = gameboard.receiveAttack(randomX, randomY);
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);
    }
  }

  return{attack, receiveAttack, receiveRandomAttack, gameboard, name}
}

// let testBoard = Gameboard();
// testBoard.getBoard()[0] = 1;
// let truth = testBoard.getBoard().every((square) => {
//   return square === null
// });
// console.log(truth);

module.exports = {
  Ship:Ship,
  Gameboard:Gameboard,
  Player:Player
};