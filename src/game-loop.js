import { updateLoop, updateSnake } from './redux-stuff/action-creators';
import { UP, RIGHT, DOWN, LEFT } from './directions';

let stId;
let unsubscribe;
let prevIteration = -1;
let direction;
let head = { x: 1, y: 3 };
let tail = { x: 0, y: 3 };

export const startGameLoop = (store) => {
  unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const iteration = state.snake.iteration;
    if (prevIteration === iteration) { // only update if the slice of interest has changed
      return;
    }
    prevIteration = iteration;
    if (stId) {
      clearTimeout(stId);
    }
    stId = setTimeout(() => {
      store.dispatch(updateLoop(iteration + 1));
      // TODO compute coordinates based on action
      tail.x = head.x;
      head.x = head.x >= 6 ? 0 : head.x + 1;
      console.log(head);
      store.dispatch(updateSnake(head, tail));
    }, 2000);
  });

  store.dispatch(updateLoop(1));
};

export const stopGameLoop = () => {
  if (stId) {
    clearTimeout(stId);
  }
  if (unsubscribe) {
    unsubscribe();
  }
};

export const registerDirection = (newDirection) => {
  direction = newDirection;
};
