import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';

import RS from './components/ReduxSnake';
import { root as snakeReducer } from './redux-stuff/reducers';
import { changeText } from './redux-stuff/action-creators';

const mapStateToProps = (state) => {
  return {
    text: state.snake.text,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doChange: () => {
      dispatch(changeText());
    }
  }
}


const ReduxSnakeConnected = connect(
  undefined,
  mapDispatchToProps,
)(RS);

const reduxDevTools = process.env.NODE_ENV === 'production' ?
  undefined :
  /* eslint-disable no-underscore-dangle */
  (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */


const ReduxSnake = ({ store }) => {
  // defaultProps are called before initialiation of component
  // so putting a store there will break Redux Dev Tools
  const getStore = () =>
    store ||
    createStore(snakeReducer, reduxDevTools);

  return (
    <Provider store={getStore()} >
      <ReduxSnakeConnected />
    </Provider >
  );
};

// ReduxSnake.defaultProps = {
//   store: createStore(combineReducers({ snake: snakeReducer }), reduxDevTools),
// };

ReduxSnake.propTypes = {
  store: storeShape,
};

export { ReduxSnake, snakeReducer };
