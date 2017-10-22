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
  constructor(props) {
    super(props);
    this.setupStore(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setupStore(nextProps);
  }

  componentWillUnmount() {
    stopGameLoop();
  }

  setupStore = (props) => {
    stopGameLoop();
    // DefaultProps are called before initialiation of component
    // so putting a store there will break Redux Dev Tools.
    const { store } = props;
    this.store = undefined;
    if (store && validateStore(store)) {
      this.store = store;
    } else {
      this.store = createStore(onlySnakeReducer, reduxDevTools);
    }
    registerStore(this.store);
  }

  render() {
    return (
      <Provider store={this.store} >
        <RS />
      </Provider >
    );
  }
}

// Keep this comment as an anti-example for this particular case.
// ReduxSnake.defaultProps = {
//   store: createStore(combineReducers({ snake: snakeReducer }), reduxDevTools),
// };
ReduxSnake.propTypes = {
  /* eslint-disable react/require-default-props */
  store: storeShape,
  /* eslint-enable */
};

export { ReduxSnake, snakeReducer };
