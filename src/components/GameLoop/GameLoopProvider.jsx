import React from 'react';
import PropTypes from 'prop-types';

import GameLoop from './GameLoop';


export default class GameLoopProvider extends React.Component {

  getChildContext() {
    return { gameLoop: this.props.gameLoop };
  }

  render() {
    return this.props.children;
  }
}
GameLoopProvider.childContextTypes = {
  gameLoop: PropTypes.instanceOf(GameLoop),
};
GameLoopProvider.propTypes = {
  gameLoop: PropTypes.instanceOf(GameLoop).isRequired,
};
