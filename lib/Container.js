'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
  (0, _invariant2.default)(BaseClass.getStores, 'Components that use Container must implement `static getStores()`');
  (0, _invariant2.default)(BaseClass.calculateState, 'Components that use Container must implement `static calculateState()`');
}

function create(BaseClass, dispatcher, initState) {
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

      _this._dispatcher = dispatcher;

      /**
       * Get Stores from base class,
       * @type {array}
       */
      _this._stores = BaseClass.getStores();

      /**
       * Initialise Stores, with state
       * @param  {Store} Store
       */
      _this._stores = _this._stores.map(function (Store) {
        (0, _invariant2.default)(Store instanceof Function, 'BaseClass.getStores(...): need to return Store instances');

        var store = new Store(_this._dispatcher);
        var state = initState[store.name];

        return state ? store.setState(state) : store;
      });
      return _this;
    }

    _createClass(Container, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return this._dispatcher;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this2 = this;

        if (_get(Object.getPrototypeOf(Container.prototype), 'componentWillUnmount', this)) {
          _get(Object.getPrototypeOf(Container.prototype), 'componentWillUnmount', this).call(this);
        }

        this._stores.forEach(function (store) {
          _this2._dispatcher.unregister(store);
        });

        this._stores = [];
      }
    }]);

    return Container;
  }(BaseClass);

  /**
   * Set DsiplayName
   * @type {string}
   */


  Container.displayName = 'Container(' + BaseClass.name + ')';

  /**
   * Define Context for Container
   * @type {Object}
   */
  Container.super.childContextTypes = {
    dispatcher: BaseClass.PropTypes.object
  };

  return Container;
}

exports.default = { create: create };