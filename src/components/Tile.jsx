import React from 'react';
import { connect } from 'react-redux';
import { interpolateCool } from 'd3-scale';

import { SNAKE, BAIT, NORMAL } from '../tile-types';

const gridSize = 7;

const commonStyle = {
  width: `${100 / gridSize}%`,
  paddingBottom: `${100 / gridSize}%`,
  // boxBizing: 'border-box',
  // MozBoxSizing: 'border-box',
  // WebkitBoxSizing: 'border-box',
  // margin: '1%',
  // borderStyle: 'solid',
  // borderColor: '#black',
  float: 'left',
  // borderWidth: '10px',
  position: 'relative',
};

const Tile = ({ color, boxShadow, zIndex }) => {
  const innerStyle = {
    position: 'absolute',
    paddingBottom: '100%',
    width: '100%',
    boxShadow,
    zIndex,
    background: color,
  };
  return (
    <div style={commonStyle} >
      <div style={innerStyle} />
    </div>
  );
};

const ConnectedTile = connect(
  (state, ownProps) => {
    const { tileIndicesInBody, tiles, body } = state.snake;
    const { x, y } = ownProps;
    let color = 'black'; // color for NORMAL
    let boxShadow;
    const tileType = tiles[x][y];
    let zIndex = 0;
    if (tileType === SNAKE) {
      const index = body.length - 1 - tileIndicesInBody[x][y];
      const shadowColor = interpolateCool(index / (gridSize * gridSize));
      color = '#ffffff';
      // box-shadow: rgb(0, 0, 0) 0 0 20px 12px inset, rgb(255, 0, 70) 0 0 20px 17px inset;
      boxShadow = `
          0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff,
          0 0 40px ${shadowColor}, 0 0 70px ${shadowColor}, 0 0 80px ${shadowColor},
           0 0 100px ${shadowColor}, 0 0 150px ${shadowColor}
          `;
      zIndex = (body.length - index);
    } else if (tileType === BAIT) {
      color = '#ffffff';
      const shadowColor = '#ff0000';
      boxShadow = `
          0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff,
          0 0 40px ${shadowColor}, 0 0 70px ${shadowColor}, 0 0 80px ${shadowColor},
           0 0 100px ${shadowColor}, 0 0 150px ${shadowColor}
          `;
      zIndex = body.length;
    }
    return { color, boxShadow, zIndex };
  },
)(Tile);

export default ConnectedTile;
