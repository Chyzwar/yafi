import invariant from 'invariant';

class EventEmiter {
  constructor() {
    this._listeners = new WeakSet();
  }

  /**
   * Add listener as callback
   * @param {Function} callback
   */
  addListener(callback) {
    this._listeners.add(callback);
  }

  /**
   * Remove a listener
   * @param  {Function} callback
   */
  removeListener(callback) {
    invariant(
      this._listeners.has(callback),
      `EventEmiter.removeListener(...): ${callback} is not valid listener`
    );
    this._listeners.delete(callback);
  }

  /**
   * Call listener callback passing eventName
   * @param  {any} eventName
   */
  emit(event) {
    this._listeners.forEach(
      (callback) => {
        callback(event);
      }
    );
  }
}

export default EventEmiter;
