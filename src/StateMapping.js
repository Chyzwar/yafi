class StateMapping {
  constructor(storeMapping, dispatcher, initState) {
    this._storeMapping = this.initialiseStores(
      storeMapping, dispatcher
    );

    this._stateMapping = this.initialiseMapping(
      this._storeMapping, initState
    );
  }

  calculateState() {
    let state = {};
    for (const key in this._stateMapping) {
      state[key] = this._stateMapping[key].getState();
    }
    return state;
  }

  initialiseStores(storeMapping, dispatcher) {
    for (const key in storeMapping) {
      if (storeMapping[key] instanceof Function) {
        storeMapping[key] = new storeMapping[key](dispatcher);
      }
    }
    return storeMapping;
  }

  initialiseMapping(mapping, initState) {
    for (let key in mapping) {
      if (initState[key]) {
        mapping[key].setState(initState[key]);
      }
    }
    return mapping;
  }
}


export default StateMapping;
