let player1 =  Player(Gameboard());
let CPU = Player(Gameboard());

class Game extends React.Component{
    constructor(props){
        super(props);
        player1.gameboard.place(0,0,Ship(3),true);
        player1.gameboard.place(2,2,Ship(4),false);
        player1.gameboard.place(6,1,Ship(4),false);
        player1.gameboard.place(4,7,Ship(4),true);
        CPU.gameboard.place(6,7,Ship(4),true);
        // this.receiveAttack = player1.gameboard.receiveAttack.bind(this);
        // this.getBoard = player1.gameboard.getBoard.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.receiveAttack = player1.gameboard.receiveAttack(this);
            this.state = {
                userTurn: true,
                playerGrid: player1.gameboard.getBoard(),
                cpuGrid: CPU.gameboard.getBoard()
        };
    }

    handleClick(x,y,player){
        // this.receiveAttack(x,y);
        if(player === "player1"){
            player1.gameboard.receiveAttack(x,y);
            this.setState({playerGrid: player1.gameboard.getBoard()});
        }
        if(player === "player2"){
            CPU.gameboard.receiveAttack(x,y);
            this.setState({cpuGrid: CPU.gameboard.getBoard()});
        }
    }

    render(){
        return(
            <div>
                <Grid
                    playerName = {"player1"}
                    board = {this.state.playerGrid}
                    onClick = {this.handleClick}
                />
                <Grid
                    playerName = {"player2"}
                    board = {this.state.cpuGrid}
                    onClick = {this.handleClick}
                />
            </div>
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
        if (!isNaN(parseFloat(this.props.board[i]))) squareClass = "healthyShip";
        if (this.props.board[i] == "m") squareClass = "miss";
        if (this.props.board[i] == "h") squareClass = "hitShip";
        let x = i % 10;
        let y = (i-x)/10;
        return (
          <Square
            squareClass={squareClass}
            value={this.props.board[i]}
            onClick={() => this.props.onClick(x,y,this.props.playerName)}
            key = {i}
          />
        );
    }

    createRow(row){
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
                    {this.createRow(0)}
                </div>
                <div className="row">
                    {this.createRow(1)}
                </div>
                <div className="row">
                    {this.createRow(2)}
                </div>
                <div className="row">
                    {this.createRow(3)}
                </div>
                <div className="row">
                    {this.createRow(4)}
                </div>
                <div className="row">
                    {this.createRow(5)}
                </div>
                <div className="row">
                    {this.createRow(6)}
                </div>
                <div className="row">
                    {this.createRow(7)}
                </div>
                <div className="row">
                    {this.createRow(8)}
                </div>
                <div className="row">
                    {this.createRow(9)}
                </div>
            </div>
        );
    }
}

let domContainer = document.querySelector('#game');
ReactDOM.render(<Game/>, domContainer);

