var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
        // player1.gameboard.place(2,2,Ship(4),false);
        // player1.gameboard.place(4,7,Ship(4),true);
        // player1.gameboard.place(6,1,Ship(4),false);
        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        player1.gameboard.randomPlace(Ship(2));
        player1.gameboard.randomPlace(Ship(3));
        player1.gameboard.randomPlace(Ship(3));
        player1.gameboard.randomPlace(Ship(3));
        player1.gameboard.randomPlace(Ship(5));
        CPU.gameboard.randomPlace(Ship(2));
        CPU.gameboard.randomPlace(Ship(3));
        CPU.gameboard.randomPlace(Ship(3));
        CPU.gameboard.randomPlace(Ship(3));
        CPU.gameboard.randomPlace(Ship(5));
        // this.receiveAttack = player1.gameboard.receiveAttack.bind(this);
        // this.getBoard = player1.gameboard.getBoard.bind(this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.checkWinner = _this.checkWinner.bind(_this);
        // this.receiveAttack = player1.gameboard.receiveAttack(this);
        _this.state = {
            userTurn: true,
            playerGrid: player1.gameboard.getBoard(),
            cpuGrid: CPU.gameboard.getBoard(),
            gameEnd: false,
            winner: null,
            multiplayer: false
        };
        return _this;
    }

    _createClass(Game, [{
        key: "handleClick",
        value: function handleClick(x, y, player, value) {
            // this.receiveAttack(x,y);
            if (value != "m" && value != "h" && this.state.gameEnd == false) {
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
            var _this3 = this;

            if (player1.gameboard.allSunk()) {
                this.setState({
                    gameEnd: true,
                    winner: "Player 2"
                }, function () {
                    alert(_this3.state.winner + " wins!");
                });
            }
            if (CPU.gameboard.allSunk()) {
                this.setState({
                    gameEnd: true,
                    winner: "Player 1"
                }, function () {
                    alert(_this3.state.winner + " wins!");
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Grid, {
                    playerName: "player1",
                    board: this.state.playerGrid,
                    onClick: this.handleClick
                }),
                React.createElement(Grid, {
                    playerName: "player2",
                    board: this.state.cpuGrid,
                    onClick: this.handleClick
                })
            );
        }
    }]);

    return Game;
}(React.Component);

function Square(props) {
    return React.createElement("button", {
        className: ["square", props.squareClass].join(" "),
        onClick: props.onClick });
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
            if (!isNaN(parseFloat(this.props.board[i]))) squareClass = "healthyShip";
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
                key: i
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