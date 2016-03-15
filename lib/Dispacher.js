import invariant from 'invariant';

class Dispatcher {
  constructor() {
    this._callbacks = {};
    this._pendingPayload = {};

    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
  }

  /**
   * Registers a callback to be invoked with every dispatched payload.
   * Returns a storeName that can be used with waitFor().
   * Only Store should register with Dispacher.
   *
   * @param  {storeName} string
   * @param  {Function} callback
   * @return {string}
   */
  register(callback, storeName) {
    invariant(
      !this._callbacks[storeName],
      `Dispatcher.register(...): ${storeName} already have Store callback.`
    );
    this._callbacks[storeName] = callback;

    return storeName;
  }


  /**
   * Unregister callback, use storeName to remove callback
   * @param  {string} storeName
   */
  unregister(storeName) {
    invariant(
      !this._callbacks[storeName],
      `Dispatcher.unregister(...): ${storeName} does not map to a registered callback.`
    );
    delete this._callbacks[storeName];
  }

  /**
   * Waits for the _callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  waitFor(stores) {
    invariant(
      this._isDispatching,
      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
    );

    for (let ii = 0; ii < stores.length; ii++) {
      let id = stores[ii];
      if (this._isPending[id]) {
        invariant(
          this._isHandled[id],
          'Dispatcher.waitFor(...): Circular dependency detected while ' +
          'waiting for `%s`.',
          id
        );
        continue;
      }
      invariant(
        this._callbacks[id],
        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
        id
      );
      this._invokeCallback(id);
    }
  }


  /**
   * Dispach a payload to all stores callbacks
   * @param  {object} payload
   */
  dispatch(payload) {
    invariant(
      !this._isDispatching,
      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    );

    this._startDispatching(payload);

    try {
      for (let id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  }


  /**
   * Is this Dispatcher currently dispatching.
   * @return {Boolean} [description]
   */
  _isDispatching() {
    return this._isDispatching;
  }


  /**
   * Call callback registered for Store
   * @param  {string} storeName
   */
  _invokeCallback(storeName) {
    this._isPending[storeName] = true;
    this._callbacks[storeName](this._pendingPayload);
    this._isHandled[storeName] = true;
  }

  /**
   * Start dispaching a payload, set bookeeping
   * @param  {object} payload
   */
  _startDispatching(payload) {
    for(let storeName in this._callbacks) {
      this._isPending[storeName] = false;
      this._isHandled[storeName] = false;
    }

    this._pendingPayload = payload;
    this._isDispatching = true;
  }

  /**
   * Cancel dipaching payload
   */
  _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  }
}

export default Dispatcher;
