'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StateMapping = require('./StateMapping');

var _StateMapping2 = _interopRequireDefault(_StateMapping);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Check if componenent implement required methods.
 * Container need these methods.
 * @param  {BaseClass} ReactClass
 */
function enforceInterface(BaseClass) {
  (0, _invariant2.default)(BaseClass.getStoreMapping, 'Components that use Container must implement `static getStoreMapping()`');
}

function create(BaseClass, dispatcher) {
  var initState = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  /**
   * Check BaseClass
   */
  enforceInterface(BaseClass);

  /**
   * Extend Container to BaseClass
   */

  var Container = function (_BaseClass) {
    _inherits(Container, _BaseClass);

    function Container(props, context) {
      _classCallCheck(this, Container);

      /**
       * Get dispatcher from stores
       * @type {Dispatcher}
       */

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Container).call(this, props, context));

      _this.dispatcher = dispatcher;

      /**
       * Key to Store Mapping
       * @type {object}
       */
      _this._storeMapping = BaseClass.getStoreMapping();

      /**
       * Create Stores mapping,
       * @type {array}
       */
      _this._stateMapping = new _StateMapping2.default(_this._storeMapping, _this.dispatcher, initState);

      /**
       * Calculate State
       * @type {Object}
       */
      _this.state = _this._stateMapping.calculateState();
      return _this;
    }

    /**
     * Add dispatcher to Context
     * @return {object}
     */


    _createClass(Container, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          dispatcher: this._dispatcher
        };
      }
    }]);

    return Container;
  }(BaseClass);

  /**
   * Set DsiplayName
   * @type {string}
   */


  Container.displayName = 'Container(' + BaseClass.name + ')';

  return Container;
}

exports.default = { create: create };