'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmiter2 = require('./EventEmiter');

var _EventEmiter3 = _interopRequireDefault(_EventEmiter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Queue = function (_EventEmiter) {
  _inherits(Queue, _EventEmiter);

  function Queue() {
    _classCallCheck(this, Queue);

    /**
     * Store items in Array
     * @type {Array}
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Queue).call(this));

    _this._items = [];
    return _this;
  }

  /**
   * Add item to queue, if was empty emit start
   * @param  {any} item
   */


  _createClass(Queue, [{
    key: 'enqueue',
    value: function enqueue(item) {
      this._items.push(item);

      if (this._items.length === 1) {
        this.emit('start');
      }
    }

    /**
     * Remove first item from queue
     * If empty emit stop
     * @return {any}
     */

  }, {
    key: 'dequeue',
    value: function dequeue() {
      var item = this._items.shift();

      if (this._items.length === 0) {
        this.emit('stop');
      }
      return item;
    }
  }]);

  return Queue;
}(_EventEmiter3.default);

exports.default = Queue;