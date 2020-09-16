var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var player1 = Player(Gameboard());
var CPU = Player(Gameboard());

var Game = function (_React$Component) {
    _inherits(Game, _React$Component);

    function Game(props) {
        _classCallCheck(this, Game);

        // player1.gameboard.place(0,0,Ship(3),true);
        // CPU.gameboard.place(0,0,Ship(3),true);
        // player1.gameboard.place(2,2,Ship(4),false);
        // player1.gameboard.place(4,7,Ship(4),true);
        // player1.gameboard.place(6,1,Ship(4),false);
        // player1.gameboard.randomSetup();
        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        CPU.gameboard.randomSetup();
        // CPU.gameboard.clearBoard();
        // this.receiveAttack = player1.gameboard.receiveAttack.bind(this);
        // this.getBoard = player1.gameboard.getBoard.bind(this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.checkWinner = _this.checkWinner.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.drop = _this.drop.bind(_this);
        _this.disabledDrop = _this.disabledDrop.bind(_this);
        _this.chooseMode = _this.chooseMode.bind(_this);
        _this.rotate = _this.rotate.bind(_this);
        // this.receiveAttack = player1.gameboard.receiveAttack(this);
        _this.state = {
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
            placingOrientation: true
        };
        return _this;
    }

    _createClass(Game, [{
        key: "handleClick",
        value: function handleClick(x, y, player, value) {
            // this.receiveAttack(x,y);
            if (value != "m" && value != "h" && this.state.gameEnd == false && this.state.placingPhase == false) {
                if (player === "player1" && this.state.userTurn === false) {
                    player1.gameboard.receiveAttack(x, y);
                    this.setState({
                        playerGrid: player1.gameboard.getBoard(),
                        userTurn: !this.state.userTurn
                    });
                    this.checkWinner();
                }

                if (player === "player2" && this.state.userTurn === true) {
                    CPU.gameboard.receiveAttack(x, y);
                    this.setState({
                        cpuGrid: CPU.gameboard.getBoard(),
                        userTurn: !this.state.userTurn
                    });
                    this.checkWinner();
                    // if(this.state.multiplayer === false) this.computerMove();
                    if (this.state.multiplayer === false) this.computerMove();
                }
            }
        }
    }, {
        key: "computerMove",
        value: function computerMove() {
            var _this2 = this;

            player1.receiveRandomAttack();
            this.setState({
                playerGrid: player1.gameboard.getBoard(),
                userTurn: true
            }, function () {
                return console.log(_this2.state.userTurn);
            });
            this.checkWinner();
        }
    }, {
        key: "checkWinner",
        value: function checkWinner() {
            if (player1.gameboard.allSunk()) {
                this.setState({
                    gameEnd: true,
                    winner: "Player 2"
                }, function () {
                    // alert(this.state.winner + " wins!");
                });
            }
            if (CPU.gameboard.allSunk()) {
                this.setState({
                    gameEnd: true,
                    winner: "Player 1"
                }, function () {
                    // alert(this.state.winner + " wins!");
                });
            }
        }
    }, {
        key: "reset",
        value: function reset() {
            player1.gameboard.clearBoard();
            CPU.gameboard.clearBoard();
            // player1.gameboard.randomSetup();
            CPU.gameboard.randomSetup();
            // console.log(document.getElementsByClassName("fleet"))
            // console.log(document.getElementsByClassName("fleet")[0])
            // document.getElementById("1").style.display = "flex";
            document.querySelectorAll(".selectableShip").forEach(function (e) {
                e.style.display = "flex";
            });
            this.setState({
                playerGrid: player1.gameboard.getBoard(),
                cpuGrid: CPU.gameboard.getBoard(),
                gameEnd: false,
                winner: null,
                userTurn: true,
                placingPhase: true,
                shipCount: 0
            });
        }
    }, {
        key: "drop",
        value: function drop(e, x, y) {
            var _this3 = this;

            // alert("X:"+x+" Y:"+ y);
            var ship_id = e.dataTransfer.getData('ship_id');
            var ship_length = e.dataTransfer.getData('ship_length');
            var valid = player1.gameboard.place(x, y, Ship(ship_length), this.state.placingOrientation);
            // alert(ship_length);
            if (!valid) document.getElementById(ship_id).style.display = "flex";
            if (valid) this.setState({
                playerGrid: player1.gameboard.getBoard(),
                shipCount: this.state.shipCount + 1,
                ships: player1.gameboard.ships
            }, function () {
                if (_this3.state.shipCount == 5) _this3.setState({ placingPhase: false });
                console.log(_this3.state.ships);
            });
            // if(this.state.shipCount == 5) this.setState({placingPhase:false});
        }
    }, {
        key: "disabledDrop",
        value: function disabledDrop(e) {
            var ship_id = e.dataTransfer.getData('ship_id');
            document.getElementById(ship_id).style.display = "flex";
            this.setState({
                playerGrid: player1.gameboard.getBoard()
            });
        }
    }, {
        key: "chooseMode",
        value: function chooseMode(mode) {
            if (mode == "sp") this.setState({ menu: false });
        }
    }, {
        key: "rotate",
        value: function rotate() {
            this.setState(function (prevState) {
                return {
                    placingOrientation: !prevState.placingOrientation
                };
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.menu) {
                return React.createElement(GameMenu, {
                    onClick: this.chooseMode
                });
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { id: "boards" },
                    React.createElement(Grid, {
                        playerName: "player1",
                        board: this.state.playerGrid,
                        onClick: this.handleClick,
                        onDrop: this.drop,
                        ships: this.state.ships
                    }),
                    React.createElement(Grid, {
                        playerName: "player2",
                        board: this.state.cpuGrid,
                        onClick: this.handleClick,
                        onDrop: this.disabledDrop,
                        ships: this.state.cpuShips
                    })
                ),
                React.createElement(GameStatus, {
                    gameEnd: this.state.gameEnd,
                    winner: this.state.winner,
                    placingPhase: this.state.placingPhase,
                    userTurn: this.state.userTurn,
                    onClick: this.reset
                }),
                React.createElement(
                    "button",
                    { className: "rotate", onClick: this.rotate },
                    "Rotate"
                ),
                React.createElement(Fleet, { length: 2, id: "1", horizontal: this.state.placingOrientation }),
                React.createElement(Fleet, { length: 3, id: "2", horizontal: this.state.placingOrientation }),
                React.createElement(Fleet, { length: 3, id: "3", horizontal: this.state.placingOrientation }),
                React.createElement(Fleet, { length: 4, id: "4", horizontal: this.state.placingOrientation }),
                React.createElement(Fleet, { length: 5, id: "5", horizontal: this.state.placingOrientation })
            );
        }
    }]);

    return Game;
}(React.Component);

function GameMenu(props) {
    return React.createElement(
        "div",
        { id: "menu" },
        React.createElement(
            "h1",
            _defineProperty({ className: "z-text" }, "className", "hero-text"),
            "Battleship.js\uD83D\uDEA2"
        ),
        React.createElement(
            "button",
            {
                onClick: function onClick() {
                    return props.onClick("sp");
                }
            },
            "Single Player"
        ),
        React.createElement(
            "button",
            {
                onClick: function onClick() {
                    return props.onClick("mp");
                },
                className: "unavailable"
            },
            "Local multiplayer"
        ),
        React.createElement(
            "button",
            {
                onClick: function onClick() {
                    return props.onClick("omp");
                },
                className: "unavailable"
            },
            "Online multiplayer"
        )
    );
}

function GameStatus(props) {
    var status = void 0;
    // if(props.gameEnd == true) status = <p>{props.winner} wins!</p>
    if (props.placingPhase) status = React.createElement(
        "p",
        null,
        "Place your ships"
    );
    if (!props.placingPhase && props.userTurn) status = React.createElement(
        "p",
        null,
        "It's your turn"
    );
    if (props.gameEnd == true) {
        return React.createElement(
            "div",
            { id: "status" },
            React.createElement(
                "p",
                null,
                props.winner,
                " wins!"
            ),
            React.createElement(
                "button",
                {
                    onClick: props.onClick
                },
                "Play again?"
            )
        );
    } else {
        return React.createElement(
            "div",
            { id: "status" },
            status
        );
    }
}

function Fleet(props) {
    function dragStart(e) {
        var target = e.target;
        // e.dataTransfer.setData('targe', target);
        e.dataTransfer.setData('ship_id', target.id);
        e.dataTransfer.setData('ship_length', target.dataset.length);

        setTimeout(function () {
            target.style.display = "none";
        }, 0);
    }

    var shipBody = [];
    for (var i = 0; i < props.length; i++) {
        var shipClass = "square healthyShip";
        // if(i==0) shipClass = "square healthyShip start";
        // if(i==props.length-1) shipClass = "square healthyShip end";
        shipBody.push(React.createElement("div", {
            className: shipClass,
            key: i
        }));
    }

    var orientationClass = void 0;
    if (props.horizontal) orientationClass = "selectableShip horizontal";
    if (!props.horizontal) orientationClass = "selectableShip vertical";

    function dragOver(e) {
        e.stopPropagation();
    }
    return React.createElement(
        "div",
        {
            id: props.id,
            "data-length": props.length,
            draggable: true,
            onDragStart: dragStart,
            onDragOver: dragOver,
            className: orientationClass
        },
        shipBody
    );
}

function Square(props) {
    function dragOver(e) {
        e.preventDefault();
    }

    return React.createElement("button", {
        className: ["square", props.squareClass].join(" "),
        onClick: props.onClick,
        onDrop: props.onDrop
        //   onDrop = {(e) => props.onDrop}
        , onDragOver: dragOver
    });
}

var Grid = function (_React$Component2) {
    _inherits(Grid, _React$Component2);

    function Grid() {
        _classCallCheck(this, Grid);

        return _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments));
    }

    _createClass(Grid, [{
        key: "renderSquare",
        value: function renderSquare(i) {
            var _this5 = this;

            var squareClass = "water";
            // console.log(this.props.ships);
            if (this.props.playerName == "player1") {
                if (!isNaN(parseFloat(this.props.board[i]))) {
                    squareClass = "healthyShip mid";
                    var id = this.props.board[i].split(".");
                    // console.log(parseInt(this.props.ships[0].length)+2);
                    var shipNum = parseInt(id[0]);
                    var shipPos = parseInt(id[1]);
                    var shipLength = parseInt(this.props.ships[shipNum].length);
                    if (shipPos == 0) squareClass = "healthyShip first";
                    if (shipPos == shipLength - 1) squareClass = "healthyShip last";
                }
            }
            if (this.props.playerName == "player2") {
                if (!isNaN(parseFloat(this.props.board[i]))) squareClass = "water";
            }
            if (this.props.board[i] == "m") squareClass = "miss";
            if (this.props.board[i] == "h") squareClass = "hitShip";
            var x = i % 10;
            var y = (i - x) / 10;
            return React.createElement(Square, {
                squareClass: squareClass,
                value: this.props.board[i],
                onClick: function onClick() {
                    return _this5.props.onClick(x, y, _this5.props.playerName, _this5.props.board[i]);
                },
                key: i,
                onDrop: function onDrop(e) {
                    return _this5.props.onDrop(e, x, y);
                },
                onDragOver: this.dragOver
            });
        }
    }, {
        key: "createRow",
        value: function createRow(row) {
            var rowArray = [];
            for (var i = row * 10; i < 10 + row * 10; i++) {
                rowArray.push(this.renderSquare(i));
            }
            return rowArray;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "gridContainer" },
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createRow(0)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createRow(1)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createRow(2)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createRow(3)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createRow(4)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createRow(5)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createRow(6)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createRow(7)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createRow(8)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createRow(9)
                )
            );
        }
    }]);

    return Grid;
}(React.Component);

var domContainer = document.querySelector('#game');
ReactDOM.render(React.createElement(Game, null), domContainer);

var ztxt = new Ztextify(".hero-text", {
    depth: "30px",
    layers: 20,
    // fade: true,
    direction: "forwards",
    event: "pointer"
    // eventRotation: "35deg"
});