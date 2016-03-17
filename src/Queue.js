import EventEmiter from 'EventEmiter';

class Queue extends EventEmiter {
  constructor() {
    super();

    /**
     * Store items in Array
     * @type {Array}
     */
    this._items = [];
  }

  /**
   * Add item to queue, if was empty emit start
   * @param  {any} item
   */
  enqueue(item) {
    this._items.push(item);

    if (this._items.length === 1) {
      this.emit('start');
    }
  }

  /**
   * Remove first item from queue
   * If empty emit stop
   * @return {any}
   */
  dequeue() {
    const item = this._items.shift();

    if (this._items.length === 0) {
      this.emit('stop');
    }
    return item;
  }
}

export default Queue;
