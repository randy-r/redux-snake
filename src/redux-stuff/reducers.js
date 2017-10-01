import { CHANGE_TEXT, UPDATE_LOOP } from './action-types';

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

export const root = (state = {}, action) => {
  const text = changeText(state.text, action);
  const iteration = loop(state.iteration, action);
  const stateModified = Object.assign(state, { text, iteration });
  return stateModified;
};
