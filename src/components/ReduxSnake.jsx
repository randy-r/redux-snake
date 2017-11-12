import React from 'react';
import { connect } from 'react-redux';
import NeonTriangle from 'react-simple-triangle';

import { setDirection, start as startGame, pause as pauseGame, resume as resumeGame } from '../game-loop';
import { UP, RIGHT, DOWN, LEFT } from '../directions';
import Tile from './Tile';
// import styles from './styles.css';

const gridSize = 7;
const ARROWUP = 'ArrowUp';
const ARROWDOWN = 'ArrowDown';
const ARROWLEFT = 'ArrowLeft';
const ARROWRIGHT = 'ArrowRight';


const styles = {
  wrap: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  br: {
    clear: 'both',
  },
  startPanel: {
    opacity: 0.8,
    background: '#000',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: gridSize * gridSize,
  },
  replayPanel: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: (gridSize * gridSize) + 1,
  },
  verticalCenter: {
    position: 'relative',
    top: '38.5%',
  },
  horizontalCenter: {
    margin: '0 auto',
    width: '20%',
  },
};


const StartPanel = connect(
  (state) => {
    return { show: state.snake.showStartPanel };
  },
)(
  ({ show, onClick }) => {
    if (!show) {
      return <div style={{ display: 'none' }} />;
    }
    return (
      <div>
        <div style={styles.startPanel} />
        <div style={styles.replayPanel}>
          <div style={styles.verticalCenter} >
            <div style={styles.horizontalCenter} >
              <NeonTriangle glowColor="rgb(0,255,0)" onClick={onClick} />
            </div>
          </div>
        </div >
      </div >

    );
  });


class ReduxSnake extends React.Component {

  constructor(props) {
    super(props);
  }

  handleKeyDown = (event) => {
    let direction;
    switch (event.key) {
      case ARROWUP:
        direction = UP;
        break;
      case ARROWRIGHT:
        direction = RIGHT;
        break;
      case ARROWDOWN:
        direction = DOWN;
        break;
      case ARROWLEFT:
        direction = LEFT;
        break;
      default:
        break;
    }
    setDirection(direction);
  }

  buildGrid = (size, onKeyDown) => {
    const rows = [];
    for (let i = 0; i < size; i += 1) {
      const elements = [];
      for (let j = 0; j < size; j += 1) {
        elements.push(<Tile key={j} x={j} y={i} />);
      }
      const row = (<div key={i} >{elements}</div>);
      rows.push(row);
      rows.push(<br key={size + i} style={styles.br} />);
    }

    return (
      <div
        onFocus={() => resumeGame()}
        onBlur={() => pauseGame()}
        ref={(el) => { this.gridRef = el; }}
        role="grid" tabIndex="0" onKeyDown={onKeyDown}
      >
        {rows}
      </div >
    );
  }

  render() {
    return (
      <div style={styles.wrap} >
        {this.buildGrid(gridSize, this.handleKeyDown)}
        <StartPanel onClick={(/* event */) => { startGame(); this.gridRef.focus(); }} />
      </div>
    );
  }
}

export default ReduxSnake;
