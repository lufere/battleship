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
    player1.gameboard.receiveAttack(2,2);
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

class Grid extends React.Component{
    renderSquare(i) {
        return (
          <Square
            value={this.props.board[i]}
            onClick={() => this.props.onClick(i)}
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
            <div>
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

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

let domContainer = document.querySelector('#game');
ReactDOM.render(<Game/>, domContainer);