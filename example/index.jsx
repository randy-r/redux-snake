import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';

import { ReduxSnake, snakeReducer } from '../src/index';

// Assuming you have a store and at least one reducer
const appReducer = (state = { msg: 'I am a state from an app that uses redux-snake' }) => state;

// Usage with your own already existing store:
const appStore = createStore(
  combineReducers({
    app: appReducer,
    snake: snakeReducer,
  }),
  {},
  /* eslint-disable no-underscore-dangle */
  (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
  /* eslint-enable */
);

ReactDOM.render((
  <div style={{
    width: '70%',
    margin: '0 auto',
  }}
  >
    <ReduxSnake store={appStore} />
  </div >),
  document.getElementById('root'),
);
