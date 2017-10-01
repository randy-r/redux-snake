import { CHANGE_TEXT } from './action-types';

export const root = (state = { text: 'Initial text' }, action) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return Object.assign({}, state, { text: action.value });
    default:
      return state;
  }
};
