import { updateLoop } from './redux-stuff/action-creators';
import { UP, RIGHT, DOWN, LEFT } from './directions';

let siID;
let direction = RIGHT;

export const start = (store) => {
  // store.dispatch({ type: direction });
  siID = setInterval(() => {
    store.dispatch({ type: direction });
  }, 1000);
};

export const stop = () => {
  if (siID) {
    clearTimeout(siID);
  }
};

export const register = (newDirection) => {
  direction = newDirection;
};
