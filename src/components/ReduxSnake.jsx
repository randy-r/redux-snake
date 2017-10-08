import React from 'react';
import { registerDirection } from '../game-loop';
import { UP, RIGHT, DOWN, LEFT } from '../directions';
// import styles from './styles.css';

const gridSize = 7;
const ARROWUP = 'ArrowUp';
const ARROWDOWN = 'ArrowDown';
const ARROWLEFT = 'ArrowLeft';
const ARROWRIGHT = 'ArrowRight';


const styles = {
  wrap: {
    width: '80%',
    margin: '0 auto',
  },
  wrapDiv: {
    width: `${100 / gridSize}%`,
    paddingBottom: `${100 / gridSize}%`,
    boxBizing: 'border-box',
    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    // margin: '1%',
    borderStyle: 'solid',
    borderColor: '#ff0000',
    float: 'left',
    background: 'darkblue',
    // borderWidth: '10px',
  },
  br: {
    clear: 'both',
  },
};



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
        elements.push(<div key={j} style={styles.wrapDiv} />);
      }
      const row = (<div key={i} >{elements}</div>);
      rows.push(row);
      rows.push(<br key={size + i} style={styles.br} />);
    }

    return (
      <div role="grid" tabIndex="0" onKeyDown={onKeyDown} style={styles.wrap} >
        {rows}
      </div >
    );
  }

  render() {
    return this.buildGrid(gridSize, this.handleKeyDown);
  }
}

export default ReduxSnake;

