import { CHANGE_TEXT, UPDATE_LOOP, UPDATE_SNAKE } from './action-types';

export const changeText = () => ({
  type: CHANGE_TEXT,
  value: `snake ${Math.random()}`,
});

export const updateLoop = iteration => ({
  type: UPDATE_LOOP,
  iteration,
});

export const updateSnake = (head, tail) => ({
  type: UPDATE_SNAKE,
  head,
  tail,
});
