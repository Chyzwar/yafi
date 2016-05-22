'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _EventEmiter2 = require('./EventEmiter');

var _EventEmiter3 = _interopRequireDefault(_EventEmiter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Store = function (_EventEmiter) {
  _inherits(Store, _EventEmiter);

  function Store(dispatcher) {
    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Store).call(this));

    _this._state = null;
    _this._changed = false;
    _this._dispatcher = dispatcher;

    /**
     * Register Store with dispatcher
     */
    _this._dispatcher.register(_this);
    return _this;
  }

  /**
   * Get current dispatcher
   * @return {Dispatcher}
   */


  _createClass(Store, [{
    key: 'getDispatcher',
    value: function getDispatcher() {
      return this._dispatcher;
    }

    /**
     * Has changed need to be called during dispatching
     * @return {Boolean}
     */

  }, {
    key: 'hasChanged',
    value: function hasChanged() {
      (0, _invariant2.default)(this._dispatcher.isQueueActive(), this.constructor.name + '.hasChanged(): Must be invoked while dispatching.');
      return this._changed;
    }

    /**
     * Emit change need be invoked to inform listeners
     */

  }, {
    key: '_emitChange',
    value: function _emitChange() {
      (0, _invariant2.default)(this._dispatcher.isQueueActive(), this.constructor.name + '._emitChange(): Must be invoked while dispatching.');
      this._changed = true;
    }

    /**
     * This method will be called in Dispatcher when processing
     * @param  {any} payload
     */

  }, {
    key: 'invokeOnDispatch',
    value: function invokeOnDispatch(payload) {
      this._changed = false;
      this._onDispatch(payload);
      if (this._changed) {
        this._emitter.emit('changed');
      }
    }

    /**
     * Each store that Extends Store need to implement this method
     * @param  {any} payload
     */

  }, {
    key: '_onDispatch',
    value: function _onDispatch(payload) {
      (0, _invariant2.default)(false, this.constructor.name + ' has not overridden Store._onDispatch(), which is required');
    }

    /**
     * Default setState
     * @param {any} state
     */

  }, {
    key: 'setState',
    value: function setState(state) {
      this._state = state;
    }

    /**
     * Default getState
     * @return {any}
     */

  }, {
    key: 'getState',
    value: function getState() {
      return this._state;
    }
  }]);

  return Store;
}(_EventEmiter3.default);

exports.default = Store;