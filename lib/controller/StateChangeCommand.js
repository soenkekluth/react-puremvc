'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pmvc = require('pmvc');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StateChangeCommand = function (_SimpleCommand) {
  _inherits(StateChangeCommand, _SimpleCommand);

  function StateChangeCommand() {
    _classCallCheck(this, StateChangeCommand);

    return _possibleConstructorReturn(this, (StateChangeCommand.__proto__ || Object.getPrototypeOf(StateChangeCommand)).apply(this, arguments));
  }

  _createClass(StateChangeCommand, [{
    key: 'execute',
    value: function execute(note) {
      var data = note.getBody();


      if (typeof Storage !== 'undefined') {
        localStorage.setItem('pmvc-react', JSON.stringify(data));
      }
    }
  }]);

  return StateChangeCommand;
}(_pmvc.SimpleCommand);

exports.default = StateChangeCommand;