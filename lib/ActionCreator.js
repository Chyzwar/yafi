"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActionCreator = function ActionCreator(dispatcher) {
  _classCallCheck(this, ActionCreator);

  /**
   * Pass refrence to current dipatcher
   * @type {Dispatcher}
   */
  this._dispatcher = dispatcher;
};

exports.default = ActionCreator;