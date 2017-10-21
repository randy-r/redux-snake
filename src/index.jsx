import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';

import RS from './components/ReduxSnake';
import { root as snakeReducer } from './redux-stuff/reducers';
import { registerStore, stop as stopGameLoop } from './game-loop';


const reduxDevTools = process.env.NODE_ENV === 'production' ?
  undefined :
  /* eslint-disable no-underscore-dangle */
  (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */


class ReduxSnake extends React.Component {
  constructor(props) {
    super(props);
    this.setupStore(props);
  }
  componentDidMount() {
    registerStore(this.store);
  }
  componentWillReceiveProps(nextProps) {
    this.setupStore(nextProps);
  }
  componentDidUpdate() {
    // TODO : start the game here also
  }
  componentWillUnmount() {
    stopGameLoop();
  }
  setupStore = (props) => {
    // TODO : stop gameloop when passed in a new store

    // defaultProps are called before initialiation of component
    // so putting a store there will break Redux Dev Tools
    this.store =
      props.store ||
      createStore(snakeReducer, reduxDevTools);
  }
  render() {
    return (
      <Provider store={this.store} >
        <RS />
      </Provider >
    );
  }
}

// ReduxSnake.defaultProps = {
//   store: createStore(combineReducers({ snake: snakeReducer }), reduxDevTools),
// };

ReduxSnake.propTypes = {
  store: storeShape,
};

export { ReduxSnake, snakeReducer };
