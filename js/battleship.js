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

  module.exports = Ship;