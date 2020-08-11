// const battleship = require('./battleship');

// const Ship = battleship.Ship;
// const Gameboard = battleship.Gameboard;
// const Player = battleship.Player;

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userTurn: true,

        };
    }

    render(){

        return(
            <div id = "test"></div>
        );
    }
}

let domContainer = document.querySelector('#game');
ReactDOM.render(<Game/>, domContainer);