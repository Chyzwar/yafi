import shallowCompare from './utils/shallowCompare';
import invariant from 'invariant';

/**
 * Get dispatcher from stores
 * Check if dispatcher is unique
 * @param  {array} stores
 * @return {Dispatcher}
 */
function getStoresDispatcher(stores) {
  invariant(
    stores && stores.length,
    'StoreGroup.getDispatcher(...) Must provide at least one store.'
  );

  const dispatcher = stores[0].getDispatcher();

  stores.forEach((store) => {
    invariant(
      store.getDispatcher() === dispatcher,
      'StoreGroup.getDispatcher(...): All stores must use the same dispatcher.'
    );
  });
  return dispatcher;
}

/**
 * Check if componenent implement required methods.
 * YafiContainer need these methods.
 * @param  {BaseClass} ReactClass
 */
function enforceInterface(BaseClass) {
  invariant(
    BaseClass.getStores,
    'Components that use YafiContainer must implement `static getStores()`'
  );
  invariant(
    BaseClass.calculateState,
    'Components that use YafiContainer must implement `static calculateState()`'
  );
}


function create(BaseClass, options = {}) {
  /**
   * Check BaseClass
   */
  enforceInterface(BaseClass);

  class YafiContainer extends BaseClass {
    constructor(props) {
      super(props);
      /**
       * Options
       * @type {object}
       */
      this._options = options;

      /**
       * Get Stores from base class
       * @type {array}
       */
      this._stores = BaseClass.getStores();

      /**
       * Get dispatcher from stores
       * @type {Dispatcher}
       */
      this._dispatcher = getStoresDispatcher(this._stores);
    }

    componentDidMount() {
      if (super.componentDidMount) {
        super.componentDidMount();
      }
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

    shouldComponentUpdate(nextProps, nextState) {
      if (this._options.isPure) {
        return shallowCompare(this, nextProps, nextState);
      }

      return super.shouldComponentUpdate();
    }

    componentWillReceiveProps(nextProps, nextState) {
      if (super.componentWillReceiveProps) {
        super.componentWillReceiveProps(nextProps, nextState);
      }
    }
  }

  /**
   * Set DsiplayName
   * @type {string}
   */
  YafiContainer.displayName = `YafiContainer(${BaseClass.name})`;


  return YafiContainer;
}


export default { create };

