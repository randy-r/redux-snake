import { CHANGE_TEXT, UPDATE_LOOP } from './action-types';

export const changeText = () => ({
  type: CHANGE_TEXT,
  value: `snake ${Math.random()}`,
});

export const updateLoop = iteration => ({
  type: UPDATE_LOOP,
  iteration,
});
