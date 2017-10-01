import { CHANGE_TEXT } from './action-types';

export const changeText = () => ({
  type: CHANGE_TEXT,
  value: `snake ${Math.random()}`,
});
