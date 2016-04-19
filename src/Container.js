import invariant from 'invariant';

/**
 * Check if componenent implement required methods.
 * Container need these methods.
 * @param  {BaseClass} ReactClass
 */
function enforceInterface(BaseClass) {
  invariant(
    BaseClass.getStores,
    'Components that use Container must implement `static getStores()`'
  );
  invariant(
    BaseClass.calculateState,
    'Components that use Container must implement `static calculateState()`'
  );
}


function create(BaseClass, dispatcher, initState) {
  /**
   * Check BaseClass
   */
  enforceInterface(BaseClass);

  /**
   * Extend Container to BaseClass
   */
  class Container extends BaseClass {
    constructor(props, context) {
      super(props, context);

      /**
       * Get dispatcher from stores
       * @type {Dispatcher}
       */
      this._dispatcher = dispatcher;


      /**
       * Get Stores from base class,
       * @type {array}
       */
      this._stores = BaseClass.getStores();

      /**
       * Initialise Stores, with state
       * @param  {Store} Store
       */
      this._stores = this._stores
        .map((Store) => {
          invariant(
            Store instanceof Function,
            'BaseClass.getStores(...): need to return Store instances'
          );

          const store = new Store(this._dispatcher);
          const state = initState[store.name];

          return state ? store.setState(state) : store;
        });
    }

    /**
     * Add dispatcher to Context
     * @return {object}
     */
    getChildContext(){
      return {
        dispatcher: this._dispatcher
      };
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }

      this._stores.forEach((store) => {
        this._dispatcher.unregister(store);
      });

      this._stores = [];
    }
  }

  /**
   * Set DsiplayName
   * @type {string}
   */
  Container.displayName = `Container(${BaseClass.name})`;


  return Container;
}


export default { create };

