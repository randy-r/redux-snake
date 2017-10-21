import React from 'react';
import { connect } from 'react-redux';

import { register as registerDirection, restart as restartGame } from '../game-loop';
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
  gameOver: {
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
    top: '32%',
  },
  horizontalCenter: {
    margin: '0 auto',
    width: '10%',
  },
};

const Replay = ({ onClick }) => {
  const shadowColor = '#00ff00';
  const textShadow = `
          0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff,
          0 0 40px ${shadowColor}, 0 0 70px ${shadowColor}, 0 0 80px ${shadowColor},
           0 0 100px ${shadowColor}, 0 0 150px ${shadowColor}
          `;
  const style = { textShadow, fontSize: '17vw', color: '#fff', cursor: 'pointer' };
  return <span style={style} role="button" tabIndex="-1" onClick={onClick}>&#x25B7;</span>;
};

const GameOverScreen = connect(
  (state) => {
    return { show: state.snake.gameOver };
  },
)(
  ({ show }) => {
    if (!show) {
      return <div style={{ display: 'none' }} />;
    }
    return (
      <div>
        <div style={styles.gameOver} />
        <div style={styles.replayPanel}>
          <div style={styles.verticalCenter} >
            <div style={styles.horizontalCenter} >
              <Replay onClick={(/* event */) => restartGame()} />
            </div>
          </div>
        </div >
      </div >

    );
  });


class ReduxSnake extends React.Component {

  constructor(props) {
    super(props);
    // setInterval(() => {
    //   props.doChange();
    // }, 800);
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
    registerDirection(direction);
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
      <div role="grid" tabIndex="0" onKeyDown={onKeyDown} >
        {rows}
      </div >
    );
  }

  render() {
    if (this.props.gameOver) {
      console.log('Game Over!');
      return null;
    }
    return (
      <div style={styles.wrap} >
        {this.buildGrid(gridSize, this.handleKeyDown)}
        <GameOverScreen />
      </div>
    );
  }
}

export default ReduxSnake;
