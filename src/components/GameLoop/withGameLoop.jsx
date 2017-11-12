import React from 'react';
import PropTypes from 'prop-types';

import GameLoop from './GameLoop';


export default (Component) => {
  const havingGameLoop = (props, context) => {
    return (
      <Component {...props} gameLoop={context.gameLoop} />
    );
  };
  havingGameLoop.contextTypes = {
    gameLoop: PropTypes.instanceOf(GameLoop),
  };

  return havingGameLoop;
};
