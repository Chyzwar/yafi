import EventEmiter from 'EventEmiter';

class Queue {
  constructor() {
    this._eventEmiter = new EventEmiter();
  }
}

export default Queue;
