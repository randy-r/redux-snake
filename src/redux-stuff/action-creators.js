import { UPDATE_LOOP } from './action-types';

export const updateLoop = (head, tail, iteration) => ({
  type: UPDATE_LOOP,
  head,
  tail,
  iteration,
});
