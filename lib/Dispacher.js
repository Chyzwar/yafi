import invariant from 'invariant';

class Dispatcher {
  constructor() {
    this._stores = new WeakSet();
    this._payloadQueue = [];
    this._isDispatching = false;
  }

  /**
   * Registers a Store to be used with every dispatch.
   * Only Store should register with Dispacher.
   *
   * @param  {Store}
   */
  register(store) {
    invariant(
      this._isDispatching,
      `Dispatcher.register(...): ${store} try to register during dispaching`
    );

    invariant(
      !this._stores.has(store),
      `Dispatcher.register(...): ${store} is already registered`
    );

    invariant(
      store.invokeOnDispatch,
      `Dispach.dispach(...): ${store} do not implement invokeOnDispatch`
    );
    this._stores.add(store);
  }

  /**
   * Unregister a Store.
   * @param  {Store}
   */
  unregister(store) {
    invariant(
      this.stores.has(store),
      `Dispatcher.unregister(...): ${store} does not map to a registered callback.`
    );

    this.stores.delete(store);
  }

  /**
   * Dispach a payload to all stores,
   * Use queue to manage paraller dispatch
   * @param  {any} payload
   */
  dispatch(payload) {
    this._isDispatching = true;
    this._payloadQueue.push(payload);
    this._processDispatch();
    this._isDispatching = false;
  }

  _processDispatch() {
    if(this._payloadQueue.lenght) {
      let nextPayload = this._payloadQueue.pop();

    }
    this._stores.forEach((store)=> {
      store.invokeOnDispatch(payload);
    });
  }
}

export default Dispatcher;
