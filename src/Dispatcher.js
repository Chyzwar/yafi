import invariant from 'invariant';
import Queue from './Queue';

class Dispatcher {
  constructor() {
    /**
     * Use WeakSet for stores
     * @type {WeakSet}
     */
    this._stores = new WeakSet();

    /**
     * Use queue to manage dispatch
     * @type {Boolean}
     */
    this._isQueueActive = false;
    this._dispatchingQueue = new Queue();
    this._dispatchingQueue.addListener(
      (event) => {
        if (event === 'end') { this._isQueueActive = false;}
        if (event === 'start') {
          this._isQueueActive = true;
          this._processQueue();
        }
      }
    );
  }

  /**
   * Registers a Store to be used with every dispatch.
   * Only Store should register with Dispacher.
   *
   * @param  {Store}
   */
  register(store) {
    invariant(
      !this._isQueueActive,
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
   * Dispach a payload by activating queue
   * Use queue to manage paraller dispatch
   * @param  {any} payload
   */
  dispatch(payload) {
    this._dispatchingQueue.enqueue(payload);
  }


  /**
   * Check if queue is active
   * @return {Boolean}
   */
  isQueueActive() {
    return this._isQueueActive;
  }


  /**
   * Process payloads for active queue
   */
  _processQueue() {
    while (this._isQueueActive) {
      const payload = this._dispatchingQueue.dequeue();

      this.stores.forEach((store) => {
        store.invokeOnDispatch(payload);
      });
    }
  }
}

export default Dispatcher;
