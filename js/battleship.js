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
  
  const getBoard = () => {
    let publicBoard = board.slice();
    return publicBoard
  }

  const place = (x, y, ship, horizontal) => {
    let available;
    ships[index] = ship;
    let pos = x + (y * 10);
    horizontal ? available = 10-x : available = 10-y;
    if(horizontal === true && available >= ship.length){
      for (let i = 0; i < ship.length; i++) {
        let id = index.toString() + "." + i.toString();
        board.splice(pos + i, 1, id);
      }
      index++
    }
    if(horizontal === false && available >= ship.length){
      for (let i = 0; i < ship.length; i++) {
        let id = index.toString() + "." + i.toString();
        board.splice(pos + (i*10), 1, id);
      }
      index++
    }
  }

  const receiveAttack = (x, y) => {
    let pos = x + (y * 10);
    if (board[pos] != null && typeof parseFloat(board[pos]) === "number"){
      let id = board[pos].split(".");
      shipNum = parseInt(id[0]);
      shipPos = parseInt(id[1]);
      ships[shipNum].hit(shipPos);
      board.splice(pos, 1, "h");
    }
    if(board[pos] === null) board.splice(pos, 1, "m");
  }

  const allSunk = () => {
    let shipsDown = ships.map((ship) => {
      return ship.isSunk()
    });
    return shipsDown.every((ship) => {
      return ship === true
    });
  }

  return{place, getBoard, receiveAttack, allSunk}
}

const Player = (gameboard) => {
  const attack = (player, x, y) => {
    if(Game.userTurn == true){
      player.receiveAttack(x, y);
    }
  }

  const receiveAttack = (x, y) => {
    gameboard.receiveAttack(x, y);
  }

  return{attack, receiveAttack, gameboard}
}

// const Game = (() => {
//   let userTurn = true;
//   let player1 =  Player(Gameboard());
//   let CPU = Player(Gameboard());

//   return{userTurn}
// })()


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