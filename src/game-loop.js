import { updateLoop } from './redux-stuff/action-creators';

let stId;
let unsubscribe;
let prevIteration = -1;

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
    }, 1000);
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
