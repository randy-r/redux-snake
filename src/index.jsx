import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import RS from './components/ReduxSnake';
import { root as rootReducer } from './redux-stuff/reducers';
import { changeText } from './redux-stuff/action-creators';

const mapStateToProps = (state) => {
  return {
    text: state.text,
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
  mapStateToProps,
  mapDispatchToProps,
)(RS);

const reduxDevTools = process.env.NODE_ENV === 'production' ?
  undefined :
   /* eslint-disable no-underscore-dangle */
  (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  /* eslint-enable */

const ReduxSnake = ({ store }) => {
  const getStore = () =>
    store ||
    createStore(rootReducer, reduxDevTools);

  return (
    <Provider store={getStore()} >
      <ReduxSnakeConnected />
    </Provider >
  );
};

export default ReduxSnake;
