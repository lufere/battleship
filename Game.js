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
        key: "renderRow",
        value: function renderRow() {
            var _this4 = this;

            // for(let i = 10; i < 20; i++){
            //     this.renderSquare(i)
            // }
            return React.createElement(Square, {
                value: this.props.board[i],
                onClick: function onClick() {
                    return _this4.props.onClick(i);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return (
                // <button>
                //     DELETE
                // </button>
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "row" },
                        this.renderSquare(0),
                        this.renderSquare(1),
                        this.renderSquare(2),
                        this.renderSquare(3),
                        this.renderSquare(4),
                        this.renderSquare(5),
                        this.renderSquare(6),
                        this.renderSquare(7),
                        this.renderSquare(8),
                        this.renderSquare(9)
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        this.renderSquare(10),
                        this.renderSquare(11),
                        this.renderSquare(12),
                        this.renderSquare(13),
                        this.renderSquare(14),
                        this.renderSquare(15),
                        this.renderSquare(16),
                        this.renderSquare(17),
                        this.renderSquare(18),
                        this.renderSquare(19)
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        this.renderSquare(20),
                        this.renderSquare(21),
                        this.renderSquare(22),
                        this.renderSquare(23),
                        this.renderSquare(24),
                        this.renderSquare(25),
                        this.renderSquare(26),
                        this.renderSquare(27),
                        this.renderSquare(28),
                        this.renderSquare(29)
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        this.renderSquare(30),
                        this.renderSquare(31),
                        this.renderSquare(32),
                        this.renderSquare(33),
                        this.renderSquare(34),
                        this.renderSquare(35),
                        this.renderSquare(36),
                        this.renderSquare(37),
                        this.renderSquare(38),
                        this.renderSquare(39)
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        this.renderSquare(40),
                        this.renderSquare(41),
                        this.renderSquare(42),
                        this.renderSquare(43),
                        this.renderSquare(44),
                        this.renderSquare(45),
                        this.renderSquare(46),
                        this.renderSquare(47),
                        this.renderSquare(48),
                        this.renderSquare(49)
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        this.renderSquare(50),
                        this.renderSquare(51),
                        this.renderSquare(52),
                        this.renderSquare(53),
                        this.renderSquare(54),
                        this.renderSquare(55),
                        this.renderSquare(56),
                        this.renderSquare(57),
                        this.renderSquare(58),
                        this.renderSquare(59)
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        this.renderSquare(60),
                        this.renderSquare(61),
                        this.renderSquare(62),
                        this.renderSquare(63),
                        this.renderSquare(64),
                        this.renderSquare(65),
                        this.renderSquare(66),
                        this.renderSquare(67),
                        this.renderSquare(68),
                        this.renderSquare(69)
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        this.renderSquare(70),
                        this.renderSquare(71),
                        this.renderSquare(72),
                        this.renderSquare(73),
                        this.renderSquare(74),
                        this.renderSquare(75),
                        this.renderSquare(76),
                        this.renderSquare(77),
                        this.renderSquare(78),
                        this.renderSquare(79)
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        this.renderSquare(80),
                        this.renderSquare(81),
                        this.renderSquare(82),
                        this.renderSquare(83),
                        this.renderSquare(84),
                        this.renderSquare(85),
                        this.renderSquare(86),
                        this.renderSquare(87),
                        this.renderSquare(88),
                        this.renderSquare(89)
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        this.renderSquare(90),
                        this.renderSquare(91),
                        this.renderSquare(92),
                        this.renderSquare(93),
                        this.renderSquare(94),
                        this.renderSquare(95),
                        this.renderSquare(96),
                        this.renderSquare(97),
                        this.renderSquare(98),
                        this.renderSquare(99)
                    )
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