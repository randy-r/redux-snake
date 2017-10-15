import React from 'react';
import { connect } from 'react-redux';

import { SNAKE, BAIT, NORMAL } from '../tile-types';

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
  baitTile: Object.assign({}, commonStyle, { background: 'red' }),
};

const tileMap = new Map();
tileMap.set(NORMAL, <div style={styles.normalTile} />);
tileMap.set(SNAKE, <div style={styles.snakeTile} />);
tileMap.set(BAIT, <div style={styles.baitTile} />);

const Tile = ({ tileType }) => {
  return tileMap.get(tileType);
};

const ConnectedTile = connect(
  (state, ownProps) => {
    return {
      tileType: state.snake.tiles[ownProps.x][ownProps.y],
    };
  },
)(Tile);

export default ConnectedTile;
