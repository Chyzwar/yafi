import invariant from 'invariant';
import EventEmiter from 'EventEmiter';


class Store extends EventEmiter {
  constructor(dispatcher) {
    super();
    this._changed = false;
    this._dispatcher = dispatcher;

    /**
     * Register Store with dispatcher
     */
    dispatcher.register(this);
  }

  /**
   * Get current dispatcher
   * @return {Dispatcher}
   */
  getDispatcher() {
    return this._dispatcher;
  }

  /**
   * Has changed need to be called during dispatching
   * @return {Boolean}
   */
  hasChanged() {
    invariant(
      this._dispatcher.isQueueActive(),
      `${this.constructor.name}.hasChanged(): Must be invoked while dispatching.`
    );
    return this._changed;
  }

  /**
   * Emit change need be invoked to inform listeners
   */
  _emitChange() {
    invariant(
      this._dispatcher.isQueueActive(),
      `${this.constructor.name}._emitChange(): Must be invoked while dispatching.`
    );
    this._changed = true;
  }

  /**
   * This method will be called in Dispatcher when processing
   * @param  {any} payload
   */
  invokeOnDispatch(payload) {
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
  _onDispatch(payload) {
    invariant(
      false,
      `${this.constructor.name} has not overridden Store.__onDispatch(), which is required`
    );
  }
}

export default Store;
