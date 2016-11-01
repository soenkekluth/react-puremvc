'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _pmvc = require('pmvc');

var _NotificationNames = require('../constants/NotificationNames');

var _NotificationNames2 = _interopRequireDefault(_NotificationNames);

var _prepCommands = require('../../controller/prep-commands');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StartupCommand = function (_MacroCommand) {
  _inherits(StartupCommand, _MacroCommand);

  function StartupCommand() {
    _classCallCheck(this, StartupCommand);

    return _possibleConstructorReturn(this, (StartupCommand.__proto__ || Object.getPrototypeOf(StartupCommand)).apply(this, arguments));
  }

  _createClass(StartupCommand, [{
    key: 'initializeMacroCommand',
    value: function initializeMacroCommand() {
      this.addSubCommand(_prepCommands.ModelPrepCommand);
      this.addSubCommand(_prepCommands.ViewPrepCommand);
    }
  }, {
    key: 'execute',
    value: function execute(note) {
      _get(StartupCommand.prototype.__proto__ || Object.getPrototypeOf(StartupCommand.prototype), 'execute', this).call(this, note);
      this.facade.removeCommand(_NotificationNames2.default.STARTUP);
      this.facade.send(_NotificationNames2.default.RENDER);
    }
  }]);

  return StartupCommand;
}(_pmvc.MacroCommand);

exports.default = StartupCommand;