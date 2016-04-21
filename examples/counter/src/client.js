import React from 'react';
import { Dispatcher, Store, Action } from 'yafi';

const dispatcher = new Dispatcher();

class CounterStore extends Store {
  constructor(dispatcher){
    super(dispatcher);
  }
}

class CounterActions extends Action{
  constructor(dispatcher){
    super(dispatcher);
  }

  increment(){
    dispatcher()
  }

  decrement(){

  }
}

class Counter extends React.Component {
  render() {
    return (
      <p>
        Clicked: {counter} times
        {' '}
        <button onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
      </p>
    );
  }
}


React.render(
    <Counter />,
    document.getElementById('root')
);
