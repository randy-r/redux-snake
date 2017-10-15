import { RESTART } from './redux-stuff/action-types';
import { UP, RIGHT, DOWN, LEFT } from './directions';

let siID;
let unsubscribe;
let direction = RIGHT;
let alreadySet = false;
let _store;
export const stop = () => {
  if (siID) {
    clearTimeout(siID);
  }
  if (unsubscribe) {
    unsubscribe();
  }
};

export const start = (store) => {
  _store = store;
  unsubscribe = store.subscribe(() => {
    const snakeState = store.getState().snake;
    if (snakeState.gameOver) {
      stop();
    }
  });
  siID = setInterval(() => {
    alreadySet = false;
    store.dispatch({ type: direction });
  }, 1000);
};

export const restart = () => {
  direction = RIGHT;
  _store.dispatch({ type: RESTART });
  start(_store);
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

export const register = (newDirection) => {
  if (alreadySet) return;
  if (direction === newDirection) return;
  if (newDirection === getOpposite(direction)) return;
  direction = newDirection;
  alreadySet = true;
};
