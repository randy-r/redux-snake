import { UPDATE_LOOP } from './action-types';
import { UP, RIGHT, DOWN, LEFT } from '../directions';

const GRID_SIZE = 7;

const iterationReducer = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_LOOP:
      return action.iteration;
    default:
      return state;
  }
};

const bodyReducer = (
  state = [...new Array(GRID_SIZE).keys()].map(() => [...new Array(GRID_SIZE).keys()].map(() => false)),
  action) => {
  switch (action.type) {
    case UPDATE_LOOP:
      const newState = state.slice(0);
      newState[action.tail.x][action.tail.y] = false;
      newState[action.head.x][action.head.y] = true;
      return newState;
    default:
      return state;
  }
};


const initState = () => {
  const iteration = 0;
  const tiles = [...new Array(GRID_SIZE).keys()]
    .map(() => [...new Array(GRID_SIZE).keys()]
      .map(() => false));

  const y = 1;
  const body = [{ x: 0, y }, { x: 1, y }, { x: 2, y }, { x: 3, y }];

  for (let i = 0; i < body.length; i += 1) {
    const bodyTile = body[i];
    tiles[bodyTile.x][bodyTile.y] = true;
  }

  return { iteration, tiles, body };
};

export const root = (state = initState(), action) => {
  // Common logic for UP, RIGHT, DOWN, LEFT is extracted before the switch statement,
  // so better return now if action type is other than these four
  if (!([UP, RIGHT, DOWN, LEFT].find(d => d === action.type))) {
    return state;
  }
  const body = state.body.slice(0);

  const crtHead = body[body.length - 1]; // last element
  const hx = crtHead.x;
  const hy = crtHead.y;

  let head;
  switch (action.type) {
    case UP:
      head = {
        x: hx,
        y: ((hy - 1) + GRID_SIZE) % GRID_SIZE,
      };
      break;
    case RIGHT:
      head = {
        x: (hx + 1) % GRID_SIZE,
        y: hy,
      };
      break;
    case DOWN:
      head = {
        x: hx,
        y: (hy + 1) % GRID_SIZE,
      };
      break;
    case LEFT:
      head = {
        x: ((hx - 1) + GRID_SIZE) % GRID_SIZE,
        y: hy,
      };
      break;
    default:
      break;
  }
  body.push(head);
  const tail = body.shift();

  // 'paint' the new head and remove the old tail
  const tiles = state.tiles.slice(0);
  tiles[tail.x][tail.y] = false;
  tiles[head.x][head.y] = true;

  const iteration = state.iteration + 1;

  return Object.assign({}, state, { iteration, tiles, body });
};
