let player1 =  Player(Gameboard());
let CPU = Player(Gameboard());

class Game extends React.Component{
    constructor(props){
        super(props);
        // player1.gameboard.place(0,0,Ship(3),true);
        // CPU.gameboard.place(0,0,Ship(3),true);
        // player1.gameboard.place(2,2,Ship(4),false);
        // player1.gameboard.place(4,7,Ship(4),true);
        // player1.gameboard.place(6,1,Ship(4),false);
        // player1.gameboard.randomSetup();
        CPU.gameboard.randomSetup();
        // CPU.gameboard.clearBoard();
        // this.receiveAttack = player1.gameboard.receiveAttack.bind(this);
        // this.getBoard = player1.gameboard.getBoard.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
        this.reset = this.reset.bind(this);
        this.drop = this.drop.bind(this);
        this.disabledDrop = this.disabledDrop.bind(this);
        this.chooseMode = this.chooseMode.bind(this);
        this.rotate = this.rotate.bind(this);
        this.random = this.random.bind(this);
        // this.receiveAttack = player1.gameboard.receiveAttack(this);
            this.state = {
                userTurn: true,
                playerGrid: player1.gameboard.getBoard(),
                cpuGrid: CPU.gameboard.getBoard(),
                gameEnd: false,
                winner: null,
                multiplayer: false,
                shipCount: 0,
                placingPhase: true,
                menu: true,
                ships: player1.gameboard.ships,
                cpuShips: CPU.gameboard.ships,
                placingOrientation: true,
        };
    }

    handleClick(x,y,player,value){
        // this.receiveAttack(x,y);
        if(value != "m" && value != "h" && this.state.gameEnd == false && this.state.placingPhase == false){
            if(player === "player1" && this.state.userTurn === false){
                player1.gameboard.receiveAttack(x,y);
                this.setState({
                    playerGrid: player1.gameboard.getBoard(),
                    userTurn: !this.state.userTurn
                });
                this.checkWinner();
            }

            if(player === "player2" && this.state.userTurn === true){
                CPU.gameboard.receiveAttack(x,y);
                this.setState({
                    cpuGrid: CPU.gameboard.getBoard(),
                    userTurn: !this.state.userTurn
                });
                this.checkWinner();
                // if(this.state.multiplayer === false) this.computerMove();
                if(this.state.multiplayer === false) this.computerMove();
            }
        }
    }

    computerMove(){
        player1.receiveRandomAttack();
        this.setState({
            playerGrid: player1.gameboard.getBoard(),
            userTurn: true
        }, ()=> console.log(this.state.userTurn));
        this.checkWinner();
    }

    checkWinner(){
        if(player1.gameboard.allSunk()) {
            this.setState({
                gameEnd: true,
                winner: "Player 2"
            }, () => {
                // alert(this.state.winner + " wins!");
            });
        }
        if(CPU.gameboard.allSunk()) {
            this.setState({
                gameEnd: true,
                winner: "Player 1"
            }, () => {
                // alert(this.state.winner + " wins!");
            });
        }
    }

    reset(){
        player1.gameboard.clearBoard();
        CPU.gameboard.clearBoard();
        // player1.gameboard.randomSetup();
        CPU.gameboard.randomSetup();
        // console.log(document.getElementsByClassName("fleet"))
        // console.log(document.getElementsByClassName("fleet")[0])
        // document.getElementById("1").style.display = "flex";
        document.querySelectorAll(".selectableShip").forEach(e =>{
            e.style.display = "flex";
        });
        this.setState({
            playerGrid: player1.gameboard.getBoard(),
            cpuGrid: CPU.gameboard.getBoard(),
            gameEnd: false,
            winner: null,
            userTurn: true,
            placingPhase: true,
            shipCount: 0,
            ships: player1.gameboard.ships,
        });
    }

    drop(e, x, y){
        // alert("X:"+x+" Y:"+ y);
        let ship_id = e.dataTransfer.getData('ship_id');
        let ship_length = e.dataTransfer.getData('ship_length');
        let valid = player1.gameboard.place(x,y,Ship(ship_length),this.state.placingOrientation);
        // alert(ship_length);
        if(!valid)document.getElementById(ship_id).style.display = "flex";
        if(valid)this.setState({
            playerGrid: player1.gameboard.getBoard(),
            shipCount: this.state.shipCount + 1,
            ships: player1.gameboard.ships,
        },()=>{
            if(this.state.shipCount == 5) this.setState({placingPhase:false});
            console.log(this.state.ships);
        });
        // if(this.state.shipCount == 5) this.setState({placingPhase:false});
    }

    disabledDrop(e){
        let ship_id = e.dataTransfer.getData('ship_id');
        document.getElementById(ship_id).style.display = "flex";
        this.setState({
            playerGrid: player1.gameboard.getBoard(),
        });
    }

    chooseMode(mode){
        if(mode == "sp") this.setState({menu:false});
    }

    rotate(){
        this.setState(prevState => ({
            placingOrientation: !prevState.placingOrientation
        }));
    }

    random(){
        // if(this.state.shipCount>0)this.reset();
        if(this.state.shipCount>0) player1.gameboard.clearBoard();
        // player1.gameboard.clearBoard();
        // this.setState({
        //     playerGrid: player1.gameboard.getBoard(),
        // });
        document.querySelectorAll(".selectableShip").forEach(e =>{
            e.style.display = "none";
        });
        player1.gameboard.randomSetup();
        // player1.gameboard.place(6,1,Ship(4),true);
        this.setState({
            playerGrid: player1.gameboard.getBoard(),
            placingPhase:false,
            ships: player1.gameboard.ships,
        },()=>{
            console.log(this.state.ships);
        });  
    }

    render(){
        if(this.state.menu){
            return(
                <GameMenu
                    onClick = {this.chooseMode}
                />
            )
        }
        if(this.state.placingPhase){
            return(
                <div>
                    <div id = "boards">
                        <Grid
                            playerName = {"player1"}
                            board = {this.state.playerGrid}
                            onClick = {this.handleClick}
                            onDrop = {this.drop}
                            ships = {this.state.ships}
                        />
                    </div>
                    <GameStatus
                        gameEnd = {this.state.gameEnd}
                        winner = {this.state.winner}
                        placingPhase = {this.state.placingPhase}
                        userTurn = {this.state.userTurn}
                        onClick = {this.reset}
                        rotate = {this.rotate}
                        random = {this.random}
                    />
                    {/* <button className = {"rotate"} onClick = {this.rotate}></button> */}
                    <div id = "fleetContainer">
                        <Fleet length = {2} id = {"1"} horizontal = {this.state.placingOrientation}/>
                        <Fleet length = {3} id = {"2"} horizontal = {this.state.placingOrientation}/>
                        <Fleet length = {3} id = {"3"} horizontal = {this.state.placingOrientation}/>
                        <Fleet length = {4} id = {"4"} horizontal = {this.state.placingOrientation}/>
                        <Fleet length = {5} id = {"5"} horizontal = {this.state.placingOrientation}/>
                    </div>
                </div>
            ); 
        }else{
            return(
                <div>
                    <div id = "boards">
                        <Grid
                            playerName = {"player1"}
                            board = {this.state.playerGrid}
                            onClick = {this.handleClick}
                            onDrop = {this.drop}
                            ships = {this.state.ships}
                        />
                        <Grid
                            playerName = {"player2"}
                            board = {this.state.cpuGrid}
                            onClick = {this.handleClick}
                            onDrop = {this.disabledDrop}
                            ships = {this.state.cpuShips}
                        />
                    </div>
                    <GameStatus
                        gameEnd = {this.state.gameEnd}
                        winner = {this.state.winner}
                        placingPhase = {this.state.placingPhase}
                        userTurn = {this.state.userTurn}
                        onClick = {this.reset}
                        rotate = {this.rotate}
                        random = {this.random}
                    />
                    {/* <button className = {"rotate"} onClick = {this.rotate}></button> */}
                    <div id = "fleetContainer">
                        <Fleet length = {2} id = {"1"} horizontal = {this.state.placingOrientation}/>
                        <Fleet length = {3} id = {"2"} horizontal = {this.state.placingOrientation}/>
                        <Fleet length = {3} id = {"3"} horizontal = {this.state.placingOrientation}/>
                        <Fleet length = {4} id = {"4"} horizontal = {this.state.placingOrientation}/>
                        <Fleet length = {5} id = {"5"} horizontal = {this.state.placingOrientation}/>
                    </div>
                </div>
            );
        }
    }
}

function GameMenu(props){
    return(
        <div id = "menu">
            <h1 className = "z-text" className = "hero-text">
            Battleship.js🚢
            </h1>
            <button
                onClick = {() => props.onClick("sp")}
            >
                Single Player
            </button>
            <button
                onClick = {() => props.onClick("mp")}
                className = "unavailable"
            >
                Local multiplayer
            </button>
            <button
                onClick = {() => props.onClick("omp")}
                className = "unavailable"
            >
                Online multiplayer
            </button>
        </div>
    )
}

function GameStatus(props){
    let status;
    // if(props.gameEnd == true) status = <p>{props.winner} wins!</p>
    if(props.placingPhase) status = <p>Place your ships</p>
    if(!props.placingPhase && props.userTurn) status = <p>It's your turn</p>
    if(props.gameEnd == true){
        return(
            <div id = "status">
                <p>{props.winner} wins!</p>
                <button
                    className = {"playAgain"}
                    onClick = {props.onClick}
                >
                Play again?
                </button>
            </div>
        )
    }else if(props.placingPhase){
        return(
            <div id = "status">
                {status}
                <div>
                    <button className = {"rotate"} onClick = {props.rotate}></button>
                    <button className = {"random"} onClick = {props.random}></button>
                </div>
            </div>
        )
    }else{
        return(
            <div id = "status">
                {status}
            </div>
        )
    }
}

function Fleet(props){
    function dragStart(e){
        const target = e.target;
        // e.dataTransfer.setData('targe', target);
        e.dataTransfer.setData('ship_id', target.id);
        e.dataTransfer.setData('ship_length', target.dataset.length);

        setTimeout(() => {
            target.style.display = "none";
        }, 0);
    }

    let shipBody = [];
    for (let i = 0; i < props.length; i++) {
        let shipClass = "square healthyShip";
        // if(i==0) shipClass = "square healthyShip start";
        // if(i==props.length-1) shipClass = "square healthyShip end";
        shipBody.push(
        <div
            className = {shipClass}
            key = {i}
        />
        );
        
    }
    
    let orientationClass;
    if(props.horizontal)orientationClass="selectableShip horizontal"
    if(!props.horizontal)orientationClass="selectableShip vertical"

    function dragOver(e){
        e.stopPropagation();
    }
    return(
        <div
            id = {props.id}
            data-length = {props.length}
            draggable = {true}
            onDragStart = {dragStart}
            onDragOver = {dragOver}
            className={orientationClass}
        >
        {shipBody}
            {/* <button 
            className={["square", "healthyShip"].join(" ")}
            >
            </button> */}
        </div>
    )
}

function Square(props) {
    function dragOver(e){
        e.preventDefault();
    }

    return (
      <button 
      className={["square", props.squareClass].join(" ")}
      onClick={props.onClick}
      onDrop = {props.onDrop}
    //   onDrop = {(e) => props.onDrop}
      onDragOver = {dragOver}
      >
        {/* {props.value} */}
      </button>
    );
}

class Grid extends React.Component{
    renderSquare(i) {
        // let horizontal = this.props.horizontal;
        let squareClass = "water";
        // console.log(this.props.ships);
        if(this.props.playerName == "player1"){
            if(!isNaN(parseFloat(this.props.board[i]))){
                let orientation = " horizontal"
                // if(horizontal) orientation = " vertical"
                squareClass = "healthyShip mid";
                let id = this.props.board[i].split(".");
                // console.log(parseInt(this.props.ships[0].length)+2);
                let shipNum = parseInt(id[0]);
                let shipPos = parseInt(id[1]);
                let shipLength;
                if(this.props.ships[shipNum]&&this.props.ships[shipNum].horizontal==false) orientation = " vertical"
                if(this.props.ships[shipNum]) shipLength = parseInt(this.props.ships[shipNum].length);
                if(shipPos == 0) squareClass = "healthyShip first";
                if (shipPos == shipLength-1) squareClass = "healthyShip last";
                squareClass = squareClass + orientation
            }
        }
        if(this.props.playerName == "player2"){
            if (!isNaN(parseFloat(this.props.board[i]))) squareClass = "water";
        }
        if (this.props.board[i] == "m") squareClass = "miss";
        if (this.props.board[i] == "h") squareClass = "hitShip";
        let x = i % 10;
        let y = (i-x)/10;
        return (
          <Square
            squareClass={squareClass}
            value={this.props.board[i]}
            onClick={() => this.props.onClick(x,y,this.props.playerName,this.props.board[i])}
            key = {i}
            onDrop = {(e) => this.props.onDrop(e,x,y)}
            onDragOver = {this.dragOver}
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
ReactDOM.render(<Game
    onDrop = {this.disabledDrop}
/>, domContainer);

var ztxt = new Ztextify(".hero-text", {
    depth: "30px",
    layers: 20,
    // fade: true,
    direction: "forwards",
    event: "pointer",
    // eventRotation: "35deg"
 });

