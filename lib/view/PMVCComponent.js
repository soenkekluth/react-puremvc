'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _storeShape = require('./utils/storeShape');

var _storeShape2 = _interopRequireDefault(_storeShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PMVCComponent = function (_Component) {
  _inherits(PMVCComponent, _Component);

  function PMVCComponent(props, context) {
    _classCallCheck(this, PMVCComponent);

    console.log(props, context);

    var _this = _possibleConstructorReturn(this, (PMVCComponent.__proto__ || Object.getPrototypeOf(PMVCComponent)).call(this, props, context));

    _this.mediator = null;
    return _this;
  }

  _createClass(PMVCComponent, [{
    key: 'tryRegisterMediator',
    value: function tryRegisterMediator() {
      if (this.mediator) {
        return;
      }

      var facade = this.context.store || this.props.store;
      if (!facade) {
        console.error('no facade');
        return;
      }

      this.mediator = facade.subscribe(this, this.props.Mediator, this.props.mediatorName);
    }
  }, {
    key: 'sendEvent',
    value: function sendEvent(name, body, type) {
      if (this.mediator && this.mediator.sendEvent) {
        this.mediator.sendEvent.apply(this.mediator, arguments);
      } else {
        var facade = this.context.store || this.props.store;
        if (facade) {
          facade.sendEvent(name, body, type);
        }
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.tryRegisterMediator();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.tryRegisterMediator();
    }
  }]);

  return PMVCComponent;
}(_react.Component);

PMVCComponent.propTypes = {
  Mediator: _react2.default.PropTypes.any,
  mediatorName: _react2.default.PropTypes.string
};
PMVCComponent.contextTypes = {
  store: _storeShape2.default
};
exports.default = PMVCComponent;