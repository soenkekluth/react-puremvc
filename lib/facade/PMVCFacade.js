'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _pmvc = require('pmvc');

var _NotificationNames = require('../constants/NotificationNames');

var _NotificationNames2 = _interopRequireDefault(_NotificationNames);

var _PMVCMediator = require('../view/PMVCMediator');

var _PMVCMediator2 = _interopRequireDefault(_PMVCMediator);

var _StartupCommand = require('../controller/StartupCommand');

var _StartupCommand2 = _interopRequireDefault(_StartupCommand);

var _RenderCommand = require('../controller/RenderCommand');

var _RenderCommand2 = _interopRequireDefault(_RenderCommand);

var _StateChangeCommand = require('../controller/StateChangeCommand');

var _StateChangeCommand2 = _interopRequireDefault(_StateChangeCommand);

var _DataChangeCommand = require('../controller/DataChangeCommand');

var _DataChangeCommand2 = _interopRequireDefault(_DataChangeCommand);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _connectMediator = require('../view/connectMediator');

var _connectMediator2 = _interopRequireDefault(_connectMediator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PMVCFacade = function (_Facade) {
  _inherits(PMVCFacade, _Facade);

  function PMVCFacade(key) {
    _classCallCheck(this, PMVCFacade);

    var _this = _possibleConstructorReturn(this, (PMVCFacade.__proto__ || Object.getPrototypeOf(PMVCFacade)).call(this, key));

    _this.mediatorMap = [];
    _this.state = {};

    _this.mediatorMap = [];
    _this.state = {};
    _this.dispatch = _this.sendEvent.bind(_this);
    return _this;
  }

  _createClass(PMVCFacade, [{
    key: 'startup',
    value: function startup(initialState) {
      if (initialState) {
        this.state = (0, _objectAssign2.default)({}, this.state, initialState);
      }
      this.send(_NotificationNames2.default.STARTUP, this.state);
      return this;
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      return this;
    }
  }, {
    key: 'sendEvent',
    value: function sendEvent(name, body, type) {
      this.send(name, body, 'Event');
    }
  }, {
    key: 'updateState',
    value: function updateState(chunk) {
      this.state = (0, _objectAssign2.default)({}, this.state, chunk);
      this.send(_NotificationNames2.default.STATE_CHANGE, this.state, 'state');
    }
  }, {
    key: 'setState',
    value: function setState(state) {
      var _this2 = this;

      this.state = (0, _objectAssign2.default)({}, this.state, state);
      Object.keys(state).forEach(function (key) {
        var proxy = _this2.getProxy(key);
        if (proxy) {
          proxy.setData(state[key], false);
        }
      });
      this.send(_NotificationNames2.default.STATE_CHANGE, this.state, 'state');
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(view) {
      if (view.mediator) {
        if (this.hasMediator(view.mediator)) {
          this.removeMediator(view.mediator);
          view.mediator = null;
        }
      }
    }
  }, {
    key: 'subscribe',
    value: function subscribe(view, MediatorClass, mediatorName) {
      var mediator = null;

      if (MediatorClass) {
        mediatorName = mediatorName || MediatorClass.NAME;
      } else if (mediatorName) {
        mediator = this.getMediator(mediatorName);
        if (mediator) {
          mediator.setViewComponent(view);
        }
      }

      if (!mediator) {
        if (!MediatorClass) {
          MediatorClass = _PMVCMediator2.default;
        }
        MediatorClass = MediatorClass === _PMVCMediator2.default ? _PMVCMediator2.default : (0, _connectMediator2.default)(MediatorClass);
        mediator = new MediatorClass();
        mediator.setViewComponent(view);
        this.addMediator(mediator);
      }

      return mediator;
    }
  }, {
    key: 'mapView',
    value: function mapView(ViewClass) {
      var MediatorClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _PMVCMediator2.default;

      this.mediatorMap.push({
        ViewClass: ViewClass,
        MediatorClass: MediatorClass
      });
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.state;
    }
  }, {
    key: 'render',
    value: function render(cb) {}
  }, {
    key: 'initializeController',
    value: function initializeController() {
      _get(PMVCFacade.prototype.__proto__ || Object.getPrototypeOf(PMVCFacade.prototype), 'initializeController', this).call(this);
      this.addCommand(_NotificationNames2.default.STARTUP, _StartupCommand2.default);
      this.addCommand(_NotificationNames2.default.DATA_CHANGE, _DataChangeCommand2.default);
      this.addCommand(_NotificationNames2.default.STATE_CHANGE, _StateChangeCommand2.default);
      this.addCommand(_NotificationNames2.default.RENDER, _RenderCommand2.default);
    }
  }], [{
    key: 'getInstance',
    value: function getInstance(key) {
      if (!key) {
        return null;
      }
      if (!_pmvc.Facade.instanceMap[key]) {
        return new PMVCFacade(key);
      }

      return _pmvc.Facade.instanceMap[key];
    }
  }]);

  return PMVCFacade;
}(_pmvc.Facade);

PMVCFacade.NAME = 'PMVCFacade';
exports.default = PMVCFacade;