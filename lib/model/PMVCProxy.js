'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _pmvc = require('pmvc');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _NotificationNames = require('../constants/NotificationNames');

var _NotificationNames2 = _interopRequireDefault(_NotificationNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PMVCProxy = function (_Proxy) {
  _inherits(PMVCProxy, _Proxy);

  function PMVCProxy(name, data) {
    _classCallCheck(this, PMVCProxy);

    var _this = _possibleConstructorReturn(this, (PMVCProxy.__proto__ || Object.getPrototypeOf(PMVCProxy)).call(this, name));

    _this.data = data;
    return _this;
  }

  _createClass(PMVCProxy, [{
    key: 'setData',
    value: function setData(data) {
      var sendNotification = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _get(PMVCProxy.prototype.__proto__ || Object.getPrototypeOf(PMVCProxy.prototype), 'setData', this).call(this, (0, _objectAssign2.default)({}, this.data, data));

      if (sendNotification) {
        this.facade.sendNotification(_NotificationNames2.default.DATA_CHANGE, this.data, this.getName());
      }
    }
  }]);

  return PMVCProxy;
}(_pmvc.Proxy);

PMVCProxy.NAME = 'PMVCProxy';
exports.default = PMVCProxy;