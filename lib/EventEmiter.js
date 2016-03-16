
class EventEmiter {
  constructor() {
    this._listeners = new Set();
  }

  /**
   * Add listener as callback
   * @param {Function} callback
   */
  addListener(callback) {
    this._listeners.add(callback);
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
