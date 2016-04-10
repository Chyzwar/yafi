'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Queue = require('./Queue');

var _Queue2 = _interopRequireDefault(_Queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dispatcher = function () {
  function Dispatcher() {
    var _this = this;

    _classCallCheck(this, Dispatcher);

    /**
     * Use WeakSet for stores
     * @type {WeakSet}
     */
    this._stores = new WeakSet();

    /**
     * Use queue to manage dispatch
     * @type {Boolean}
     */
    this._isQueueActive = false;
    this._dispatchingQueue = new _Queue2.default();
    this._dispatchingQueue.addListener(function (event) {
      if (event === 'end') {
        _this._isQueueActive = false;
      }
      if (event === 'start') {
        _this._isQueueActive = true;
        _this._processQueue();
      }
    });
  }

  /**
   * Registers a Store to be used with every dispatch.
   * Only Store should register with Dispacher.
   *
   * @param  {Store}
   */


  _createClass(Dispatcher, [{
    key: 'register',
    value: function register(store) {
      (0, _invariant2.default)(!this._isQueueActive, 'Dispatcher.register(...): ' + store + ' try to register during dispaching');

      (0, _invariant2.default)(!this._stores.has(store), 'Dispatcher.register(...): ' + store + ' is already registered');

      (0, _invariant2.default)(store.invokeOnDispatch, 'Dispach.dispach(...): ' + store + ' do not implement invokeOnDispatch');
      this._stores.add(store);
    }

    /**
     * Unregister a Store.
     * @param  {Store}
     */

  }, {
    key: 'unregister',
    value: function unregister(store) {
      (0, _invariant2.default)(this.stores.has(store), 'Dispatcher.unregister(...): ' + store + ' does not map to a registered callback.');

      this.stores.delete(store);
    }

    /**
     * Dispach a payload by activating queue
     * Use queue to manage paraller dispatch
     * @param  {any} payload
     */

  }, {
    key: 'dispatch',
    value: function dispatch(payload) {
      this._dispatchingQueue.enqueue(payload);
    }

    /**
     * Wait for callbacks on selected stores to be called
     * @param  {array} stores
     */

  }, {
    key: 'waitFor',
    value: function waitFor(stores) {}

    /**
     * Wait till selected stores finish
     * @param  {array} stores
     * @return {Promise}
     */

  }, {
    key: 'waitForAsync',
    value: function waitForAsync(stores) {}

    /**
     * Check if queue is active
     * @return {Boolean}
     */

  }, {
    key: 'isQueueActive',
    value: function isQueueActive() {
      return this._isQueueActive;
    }

    /**
     * Process payloads for active queue
     */

  }, {
    key: '_processQueue',
    value: function _processQueue() {
      var _this2 = this;

      var _loop = function _loop() {
        var payload = _this2._dispatchingQueue.dequeue();

        _this2.stores.forEach(function (store) {
          store.invokeOnDispatch(payload);
        });
      };

      while (this._isQueueActive) {
        _loop();
      }
    }
  }]);

  return Dispatcher;
}();

exports.default = Dispatcher;