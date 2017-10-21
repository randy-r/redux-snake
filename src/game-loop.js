import { START } from './redux-stuff/action-types';
import { UP, RIGHT, DOWN, LEFT } from './directions';

let siID;
let unsubscribe;
let direction = RIGHT;
let directionAlreadySet = false;
let store;
let running = false;

export const stop = () => {
  if (siID) {
    clearTimeout(siID);
  }
  if (unsubscribe) {
    unsubscribe();
  }
  running = false;
};

export const registerStore = (newStore) => {
  store = newStore;
};

const setLoopInterval = () => {
  return setInterval(() => {
    directionAlreadySet = false;
    store.dispatch({ type: direction });
  }, 1000);
};

export const start = () => {
  if (!store) {
    throw new Error('You must register a store before starting the game loop!');
  }
  unsubscribe = store.subscribe(() => {
    const snakeState = store.getState().snake;
    if (snakeState.showStartPanel) {
      stop();
    }
  });
  siID = setLoopInterval();
  running = true;
  direction = RIGHT;
  store.dispatch({ type: START });
};

export const pause = () => {
  if (siID && running) {
    clearInterval(siID);
    running = false;
  }
};

export const resume = () => {
  if (!running) {
    siID = setLoopInterval();
    running = true;
  }
};

const getOpposite = (dir) => {
  const opposites = {
    [UP]: DOWN,
    [DOWN]: UP,
    [RIGHT]: LEFT,
    [LEFT]: RIGHT,
  };
  return opposites[dir];
};

export const setDirection = (newDirection) => {
  if (directionAlreadySet) return;
  if (direction === newDirection) return;
  if (newDirection === getOpposite(direction)) return;
  direction = newDirection;
  directionAlreadySet = true;
};
