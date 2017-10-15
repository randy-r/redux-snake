import React from 'react';
import { connect } from 'react-redux';

const gridSize = 7;

const commonStyle = {
  width: `${100 / gridSize}%`,
  paddingBottom: `${100 / gridSize}%`,
  boxBizing: 'border-box',
  MozBoxSizing: 'border-box',
  WebkitBoxSizing: 'border-box',
  // margin: '1%',
  borderStyle: 'solid',
  borderColor: '#ff0000',
  float: 'left',
  // borderWidth: '10px',
};

const styles = {
  normalTile: Object.assign({}, commonStyle, { background: 'darkblue' }),
  snakeTile: Object.assign({}, commonStyle, { background: 'green' }),
};

const Tile = ({isSnakeTile}) => {
  const style = isSnakeTile ? styles.snakeTile : styles.normalTile;
  return <div style={style} />;
};

const ConnectedTile = connect(
  (state, ownProps) => {
    return {
      isSnakeTile: state.snake.tiles[ownProps.x][ownProps.y],
    };
  },
)(Tile);

export default ConnectedTile;
