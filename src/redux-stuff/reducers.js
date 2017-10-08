import { CHANGE_TEXT, UPDATE_LOOP, UPDATE_SNAKE } from './action-types';

const loop = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_LOOP:
      return action.iteration;
    default:
      return state;
  }
};

const changeText = (state = 'Initial text', action) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return action.value;
    default:
      return state;
  }
};

const bodyReducer = (
  state = [...new Array(7).keys()].map(() => [...new Array(7).keys()].map(() => false)),
  action) => {
  switch (action.type) {
    case UPDATE_SNAKE:
      const newState = state.slice(0);
      newState[action.tail.x][action.tail.y] = false;
      newState[action.head.x][action.head.y] = true;
      return newState;
    default:
      return state;
  }
};

export const root = (state = {}, action) => {
  const text = changeText(state.text, action);
  const iteration = loop(state.iteration, action);
  const body = bodyReducer(state.body, action);
  // TODO check the above values and if they are the same return the same state instance
  const stateModified = Object.assign(state, { text, iteration, body });
  return stateModified;
};
