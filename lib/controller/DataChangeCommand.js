'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pmvc = require('pmvc');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataChangeCommand = function (_SimpleCommand) {
  _inherits(DataChangeCommand, _SimpleCommand);

  function DataChangeCommand() {
    _classCallCheck(this, DataChangeCommand);

    return _possibleConstructorReturn(this, (DataChangeCommand.__proto__ || Object.getPrototypeOf(DataChangeCommand)).apply(this, arguments));
  }

  _createClass(DataChangeCommand, [{
    key: 'execute',
    value: function execute(note) {
      var data = note.getBody();

      var localState = {};
      localState[note.getType()] = data;

      var state = this.facade.getState();
      if (Object.hasOwnProperty.call(state, note.getType())) {
        this.facade.updateState(localState);
      }
    }
  }]);

  return DataChangeCommand;
}(_pmvc.SimpleCommand);

exports.default = DataChangeCommand;