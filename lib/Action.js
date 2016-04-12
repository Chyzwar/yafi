"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = function Action(dispatcher) {
  _classCallCheck(this, Action);

  /**
   * Pass refrence to current dipatcher
   * @type {Dispatcher}
   */
  this._dispatcher = dispatcher;
};

exports.default = Action;