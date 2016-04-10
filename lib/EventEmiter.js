'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmiter = function () {
  function EventEmiter() {
    _classCallCheck(this, EventEmiter);

    this._listeners = new WeakSet();
  }

  /**
   * Add listener as callback
   * @param {Function} callback
   */


  _createClass(EventEmiter, [{
    key: 'addListener',
    value: function addListener(callback) {
      this._listeners.add(callback);
    }

    /**
     * Remove a listener
     * @param  {Function} callback
     */

  }, {
    key: 'removeListener',
    value: function removeListener(callback) {
      (0, _invariant2.default)(this._listeners.has(callback), 'EventEmiter.removeListener(...): ' + callback + ' is not valid listener');
      this._listeners.delete(callback);
    }

    /**
     * Call listener callback passing eventName
     * @param  {any} eventName
     */

  }, {
    key: 'emit',
    value: function emit(event) {
      this._listeners.forEach(function (callback) {
        callback(event);
      });
    }
  }]);

  return EventEmiter;
}();

exports.default = EventEmiter;