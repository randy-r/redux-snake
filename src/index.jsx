import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';

import RS from './components/ReduxSnake';
import { root as snakeReducer } from './redux-stuff/reducers';
import { changeText } from './redux-stuff/action-creators';
import { startGameLoop, stopGameLoop } from './game-loop';

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


class ReduxSnake extends React.Component {
  constructor(props) {
    super(props);
    this.setupStore();
  }
  componentDidMount() {
    startGameLoop(this.store);
  }
  componentWillReceiveProps(/* nextProps */) {
    this.setupStore();
  }
  componentWillUnmount() {
    stopGameLoop();
  }
  setupStore = () => {
    // defaultProps are called before initialiation of component
    // so putting a store there will break Redux Dev Tools
    this.store =
      this.props.store ||
      createStore(snakeReducer, reduxDevTools);
  }

  render() {
    return (
      <Provider store={this.store} >
        <ReduxSnakeConnected />
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
