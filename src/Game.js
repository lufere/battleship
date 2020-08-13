// const battleship = require('./battleship');

// const Ship = battleship.Ship;
// const Gameboard = battleship.Gameboard;
// const Player = battleship.Player;

class Game extends React.Component{
    constructor(props){
    let player1 =  Player(Gameboard());
    let CPU = Player(Gameboard());
    player1.gameboard.place(0,0,Ship(3),true);
    player1.gameboard.place(2,2,Ship(4),false);
    player1.gameboard.receiveAttack(2,3);
    player1.gameboard.receiveAttack(4,2);
        super(props);
        this.state = {
            userTurn: true,
            playerGrid: player1.gameboard.getBoard()
        };
    }

    render(){
        return(
            <Grid
                board = {this.state.playerGrid}
            />
        );
    }
}

function Square(props) {
    return (
      <button 
      className={["square", props.squareClass].join(" ")}
      onClick={props.onClick}>
        {/* {props.value} */}
      </button>
    );
}

class Grid extends React.Component{
    renderSquare(i) {
        let squareClass = "water";
        if (this.props.board[i] != null && typeof parseFloat(this.props.board[i]) === "number") squareClass = "healthyShip";
        if (this.props.board[i] == "m") squareClass = "miss";
        if (this.props.board[i] == "h") squareClass = "hitShip";
        return (
          <Square
            squareClass={squareClass}
            value={this.props.board[i]}
            onClick={() => this.props.onClick(i)}
            key = {i}
          />
        );
    }

    createrRow(row){
        let rowArray = [];
        for(let i = row*10; i < 10+(row*10); i++){
            rowArray.push(this.renderSquare(i));
        }
        return rowArray
    }

    render(){
        return(
            <div className="gridContainer">
                <div className="row">
                    {this.createrRow(0)}
                </div>
                <div className="row">
                    {this.createrRow(1)}
                </div>
                <div className="row">
                    {this.createrRow(2)}
                </div>
                <div className="row">
                    {this.createrRow(3)}
                </div>
                <div className="row">
                    {this.createrRow(4)}
                </div>
                <div className="row">
                    {this.createrRow(5)}
                </div>
                <div className="row">
                    {this.createrRow(6)}
                </div>
                <div className="row">
                    {this.createrRow(7)}
                </div>
                <div className="row">
                    {this.createrRow(8)}
                </div>
                <div className="row">
                    {this.createrRow(9)}
                </div>
            </div>
        );
    }
}

let domContainer = document.querySelector('#game');
ReactDOM.render(<Game/>, domContainer);