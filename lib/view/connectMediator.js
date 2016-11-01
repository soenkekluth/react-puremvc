'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PMVCMediator = require('./PMVCMediator');

var _PMVCMediator2 = _interopRequireDefault(_PMVCMediator);

var _coreDecorators = require('core-decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mediatorDecorators = {
  handleNotification: function handleNotification(func) {
    var _this = this;

    return function (notification) {
      _PMVCMediator2.default.prototype.handleNotification.call(_this, notification);
      func.call(_this, notification);
    };
  },
  listNotificationInterests: function listNotificationInterests(func) {
    var _this2 = this;

    return function () {
      return _PMVCMediator2.default.prototype.listNotificationInterests.call(_this2).concat(func.call(_this2));
    };
  },
  onRegister: function onRegister(func) {
    var _this3 = this;

    return function () {
      func.call(_this3);
      _PMVCMediator2.default.prototype.onRegister.call(_this3);
    };
  },
  onRemove: function onRemove(func) {
    var _this4 = this;

    return function () {
      func.call(_this4);
      _PMVCMediator2.default.prototype.onRemove.call(_this4);
    };
  }
};

var connectMediator = function connectMediator(TargetClass) {
  var prototype = TargetClass.prototype;

  var propsToInherit = ['handleNotification', 'listNotificationInterests', 'onRegister', 'onRemove'];
  var propsToDecorate = [];

  for (var i = 0, l = propsToInherit.length; i < l; i++) {
    var a = propsToInherit[i];
    if (Object.hasOwnProperty.call(prototype, a)) {
      propsToDecorate.push(a);
    }
  }

  if (propsToDecorate.length) {
    var decorators = {};
    for (var _i = 0, _l = propsToDecorate.length; _i < _l; _i++) {
      var b = propsToDecorate[_i];
      decorators[b] = [_coreDecorators.autobind, (0, _coreDecorators.decorate)(mediatorDecorators[b])];
    }

    (0, _coreDecorators.applyDecorators)(TargetClass, decorators);
  }

  for (var _i2 = 0, _l2 = propsToInherit.length; _i2 < _l2; _i2++) {
    var _b = propsToInherit[_i2];
    if (propsToDecorate.indexOf(_b) === -1) {
      TargetClass.prototype[_b] = _PMVCMediator2.default.prototype[_b];
    }
  }

  (0, _coreDecorators.mixin)(_PMVCMediator2.default.prototype)(TargetClass);

  return TargetClass;
};

exports.default = connectMediator;