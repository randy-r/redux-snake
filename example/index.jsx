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
  (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);

ReactDOM.render(<ReduxSnake store={appStore} />, document.getElementById('root'));
