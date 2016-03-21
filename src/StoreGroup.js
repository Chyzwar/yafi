import invariant from 'invariant';
import Store from './Store';

class StoreGroup extends Store {
  constructor(stores, callback) {

    this._stores = stores;
    this._dispatcher = this._findDispatcher(stores);
    this._callback = callback;

    this._dispatcher.register(this);
  }

  release() {
    this._dispatcher.unregister(this);
  }

  invokeOnDispatch() {
    this
      ._dispatcher
      .waitForAsync(this._stores)
      .then(this._callback);
  }

  /**
   * Get group dispatcher
   * @return {Dispatcher}
   */
  getDispatcher() {
    return this._dispatcher;
  }

  /**
   * Get dispatcher from stores
   * Check if dispatcher is unique
   * @param  {array} stores
   * @return {Dispatcher}
   */
  _findDispatcher(stores) {
    invariant(
      stores && stores.length,
      'StoreGroup.getDispatcher(...) Must provide at least one store.'
    );

    const dispatcher = stores.first().getDispatcher();

    stores.forEach((store) => {
      invariant(
        store.getDispatcher() === dispatcher,
        'StoreGroup.getDispatcher(...): All stores must use the same dispatcher.'
      );
    });
    return dispatcher;
  }
}


export default StoreGroup;
