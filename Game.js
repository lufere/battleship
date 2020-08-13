var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const battleship = require('./battleship');

// const Ship = battleship.Ship;
// const Gameboard = battleship.Gameboard;
// const Player = battleship.Player;

var Game = function (_React$Component) {
    _inherits(Game, _React$Component);

    function Game(props) {
        _classCallCheck(this, Game);

        var player1 = Player(Gameboard());
        var CPU = Player(Gameboard());
        player1.gameboard.place(0, 0, Ship(3), true);
        player1.gameboard.place(2, 2, Ship(4), false);
        player1.gameboard.receiveAttack(2, 2);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        _this.state = {
            userTurn: true,
            playerGrid: player1.gameboard.getBoard()
        };
        return _this;
    }

    _createClass(Game, [{
        key: "render",
        value: function render() {

            return React.createElement(Grid, {
                board: this.state.playerGrid
            });
        }
    }]);

    return Game;
}(React.Component);

var Grid = function (_React$Component2) {
    _inherits(Grid, _React$Component2);

    function Grid() {
        _classCallCheck(this, Grid);

        return _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).apply(this, arguments));
    }

    _createClass(Grid, [{
        key: "renderSquare",
        value: function renderSquare(i) {
            var _this3 = this;

            return React.createElement(Square, {
                value: this.props.board[i],
                onClick: function onClick() {
                    return _this3.props.onClick(i);
                }
            });
        }
    }, {
        key: "createrRow",
        value: function createrRow(row) {
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
                null,
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createrRow(0)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createrRow(1)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createrRow(2)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createrRow(3)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createrRow(4)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createrRow(5)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createrRow(6)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createrRow(7)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createrRow(8)
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createrRow(9)
                )
            );
        }
    }]);

    return Grid;
}(React.Component);

function Square(props) {
    return React.createElement(
        "button",
        { className: "square", onClick: props.onClick },
        props.value
    );
}

var domContainer = document.querySelector('#game');
ReactDOM.render(React.createElement(Game, null), domContainer);