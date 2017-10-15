import React from 'react';
import { connect } from 'react-redux';
import { interpolateCool } from 'd3-scale';

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

const Tile = ({ color }) => {
  return <div style={Object.assign({}, commonStyle, { background: color })} />;
};

const ConnectedTile = connect(
  (state, ownProps) => {
    const { tileIndicesInBody, tiles } = state.snake;
    const { x, y } = ownProps;
    let color = 'darkblue'; // color for NORMAL
    const tileType = tiles[x][y];
    if (tileType === SNAKE) {
      const index = tileIndicesInBody[x][y];
      color = interpolateCool(index / (gridSize * gridSize));
    } else if (tileType === BAIT) {
      color = 'red';
    }
    return { color };
  },
)(Tile);

export default ConnectedTile;
