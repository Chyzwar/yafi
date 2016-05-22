"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateMapping = function () {
  function StateMapping(storeMapping, dispatcher, initState) {
    _classCallCheck(this, StateMapping);

    this._storeMapping = this.initialiseStores(storeMapping, dispatcher);

    this._stateMapping = this.initialiseMapping(this._storeMapping, initState);
  }

  _createClass(StateMapping, [{
    key: "calculateState",
    value: function calculateState() {
      var state = {};
      for (var key in this._stateMapping) {
        state[key] = this._stateMapping[key].getState();
      }
      return state;
    }
  }, {
    key: "initialiseStores",
    value: function initialiseStores(storeMapping, dispatcher) {
      for (var key in storeMapping) {
        if (storeMapping[key] instanceof Function) {
          storeMapping[key] = new storeMapping[key](dispatcher);
        }
      }
      return storeMapping;
    }
  }, {
    key: "initialiseMapping",
    value: function initialiseMapping(mapping, initState) {
      for (var key in mapping) {
        if (initState[key]) {
          mapping[key].setState(initState[key]);
        }
      }
      return mapping;
    }
  }]);

  return StateMapping;
}();

exports.default = StateMapping;