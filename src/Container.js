import StateMapping from './StateMapping';
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

  invariant(
    BaseClass.childContextTypes,
    'Components that use Container must implement `static childContextTypes()`'
  );
}


function create(BaseClass, dispatcher, initState = {}) {
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
      this.dispatcher = dispatcher;

      /**
       * Key to Store Mapping
       * @type {object}
       */
      this._storeMapping = BaseClass.getStoreMapping();

      /**
       * Create Stores mapping,
       * @type {array}
       */
      this._stateMapping = new StateMapping(
        this._storeMapping, this.dispatcher, initState
      );

      /**
       * Calculate State
       * @type {Object}
       */
      this.state = this._stateMapping.calculateState();
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
  }

  /**
   * Set DsiplayName
   * @type {string}
   */
  Container.displayName = `Container(${BaseClass.name})`;


  return Container;
}


export default { create };
