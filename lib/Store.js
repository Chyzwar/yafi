import invariant from 'invariant';
import { EventEmitter } from 'fbemitter';


class Store {
  constructor(dispatcher) {

    this.__changed = false;
    this.__changeEvent = 'change';
    this.__dispatcher = dispatcher;
    this.__emitter = new EventEmitter();

    this._dispatchToken = dispatcher.register((payload) => {
      this.__invokeOnDispatch(payload);
    });
  }


  addListener(callback: (eventType?: string) => void): Object {
    return this.__emitter.addListener(this.__changeEvent, callback);
  }


  getDispatcher(): Dispatcher {
    return this.__dispatcher;
  }

  getDispatchToken(): string {
    return this._dispatchToken;
  }

  /**
   * @public
   * @return {boolean} Whether the store has changed during the most recent
   *   dispatch.
   */
  hasChanged(): boolean {
    invariant(
      this.__dispatcher.isDispatching(),
      '%s.hasChanged(): Must be invoked while dispatching.',
      this.constructor.name;
    );
    return this.__changed;
  }

  /**
   * @protected
   * Emit an event notifying listeners that the state of the store has changed.
   */
  __emitChange(): void {
    invariant(
      this.__dispatcher.isDispatching(),
      '%s.__emitChange(): Must be invoked while dispatching.',
      this.__className
    );
    this.__changed = true;
  }

  /**
   * This method encapsulates all logic for invoking __onDispatch. It should
   * be used for things like catching changes and emitting them after the
   * subclass has handled a payload.
   *
   * @protected
   * @param {object} payload The data dispatched by the dispatcher, describing
   *   something that has happened in the real world: the user clicked, the
   *   server responded, time passed, etc.
   */
  __invokeOnDispatch(payload: Object): void {
    this.__changed = false;
    this.__onDispatch(payload);
    if (this.__changed) {
      this.__emitter.emit(this.__changeEvent);
    }
  }


  __onDispatch(payload: Object): void {
    invariant(
      false,
      '%s has not overridden Store.__onDispatch(), which is required',
      this.__className
    );
  }
}

export default Store;
