import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';

import RS from './components/ReduxSnake';
import { root as snakeReducer } from './redux-stuff/reducers';
import { registerStore, stop as stopGameLoop } from './game-loop';


const reduxDevTools = process.env.NODE_ENV === 'production' ?
  undefined :
  /* eslint-disable no-underscore-dangle */
  (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  /* eslint-enable */;


const validateStore = (store) => {
  if (!('snake' in store.getState())) {
    const example = 'createStore(combineReducers({ snake: snakeReducer })';
    const msg = `
        Error in ReduxSnake.
        When you pass in a redux store you must use the snakeReducer under 'snake' key in combineReducers.
        Example: '${example}'.
        `;
    throw new Error(msg);
  }
  return true;
};

// state has to have the snake slice/property
const onlySnakeReducer = combineReducers({ snake: snakeReducer });

class ReduxSnake extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.setupStore(context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setupStore(nextContext);
  }

  componentWillUnmount() {
    stopGameLoop();
  }

  setupStore = (context) => {
    stopGameLoop();
    const { store } = context;
    this.store = undefined;
    if (store && validateStore(store)) {
      this.store = store;
    } else {
      this.store = createStore(onlySnakeReducer, reduxDevTools);
    }
    registerStore(this.store);
  }

  render() {
    if (this.context.store) {
      // there is already a Provider in the hierarchy
      return <RS />;
    }
    return (
      <Provider store={this.store} >
        <RS />
      </Provider >
    );
  }
}

ReduxSnake.contextTypes = {
  store: storeShape,
};

export { ReduxSnake, snakeReducer };
