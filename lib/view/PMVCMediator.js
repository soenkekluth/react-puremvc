'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pmvc = require('pmvc');

var _NotificationNames = require('../constants/NotificationNames');

var _NotificationNames2 = _interopRequireDefault(_NotificationNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var instanceCount = 0;

var PMVCMediator = function (_Mediator) {
  _inherits(PMVCMediator, _Mediator);

  function PMVCMediator(name, view) {
    _classCallCheck(this, PMVCMediator);

    if (!name) {
      instanceCount += 1;
      name = PMVCMediator.NAME + '_' + instanceCount;
    }
    return _possibleConstructorReturn(this, (PMVCMediator.__proto__ || Object.getPrototypeOf(PMVCMediator)).call(this, name, view));
  }

  _createClass(PMVCMediator, [{
    key: 'handleNotification',
    value: function handleNotification(notification) {
      if (notification.getName() === _NotificationNames2.default.STATE_CHANGE) {
        this.updateView();
      }
    }
  }, {
    key: 'listNotificationInterests',
    value: function listNotificationInterests() {
      return [_NotificationNames2.default.STATE_CHANGE];
    }
  }, {
    key: 'updateView',
    value: function updateView() {
      if (this.view && this.view.handleChange) {
        this.view.handleChange();
      }
    }
  }, {
    key: 'onRegister',
    value: function onRegister() {
      this.updateView();
    }
  }, {
    key: 'onRemove',
    value: function onRemove() {}
  }]);

  return PMVCMediator;
}(_pmvc.Mediator);

PMVCMediator.NAME = 'PMVCMediator';
exports.default = PMVCMediator;