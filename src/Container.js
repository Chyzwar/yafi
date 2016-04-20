import invariant from 'invariant';

/**
 * Check if componenent implement required methods.
 * Container need these methods.
 * @param  {BaseClass} ReactClass
 */
function enforceInterface(BaseClass) {
  invariant(
    BaseClass.getStoreMapping,
    'Components that use Container must implement `static getStoreMapping()`'
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
      this.mapping = BaseClass.getStoreMapping();

      /**
       * Initialise Stores
       * @param  {Store} Store
       */
      this._stores = this._stores
        .map((Store) => {
          invariant(
            Store instanceof Function,
            'BaseClass.getStores(...): need to return Store instances'
          );
          return new Store(this._dispatcher);
        }
      );

      /**
       * Initialise State
       * @type {object}
       */
      this.state = BaseClass.calculateState();

      /**
       * Merge with initial state if any
       */
      Object.assign(this.state, initState);
    }

    /**
     * Add dispatcher to Context
     * @return {object}
     */
    getChildContext() {
      return {
        dispatcher: this._dispatcher,
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

