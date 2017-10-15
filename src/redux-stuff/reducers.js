import { RESTART } from './action-types';
import { UP, RIGHT, DOWN, LEFT } from '../directions';
import { SNAKE, BAIT, NORMAL } from '../tile-types';

const GRID_SIZE = 7;

const selectNormal = (tiles) => {
  const selected = [];
  for (let i = 0; i < tiles.length; i += 1) {
    for (let j = 0; j < tiles.length; j += 1) {
      const value = tiles[i][j];
      if (value === NORMAL) {
        selected.push({ x: i, y: j });
      }
    }
  }
  return selected;
};

/**
 * The maximum is exclusive and the minimum is inclusive
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomBaitTile = (tiles) => {
  const available = selectNormal(tiles);
  return available[getRandomInt(0, available.length)];
};

const initState = () => {
  const iteration = 0;
  const tiles = [...new Array(GRID_SIZE).keys()]
    .map(() => [...new Array(GRID_SIZE).keys()]
      .map(() => NORMAL));

  const y = 1;
  const body = [{ x: 0, y }, { x: 1, y }, { x: 2, y }, { x: 3, y }];

  for (let i = 0; i < body.length; i += 1) {
    const bodyTile = body[i];
    tiles[bodyTile.x][bodyTile.y] = SNAKE;
  }

  const bait = { x: 3, y: 3 };
  tiles[bait.x][bait.y] = BAIT;

  const gameOver = false;
  return { iteration, tiles, body, bait, gameOver };
};

export const root = (state = initState(), action) => {
  if (action.type === RESTART) {
    return initState();
  }
  // Common logic for UP, RIGHT, DOWN, LEFT is extracted outside the switch statement,
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

  // collision detection
  if (body.find(p => p.x === head.x && p.y === head.y)) {
    return Object.assign({}, state, { gameOver: true });
  }
  body.push(head);

  const tiles = state.tiles.slice(0);
  const crtBait = state.bait;
  let bait = crtBait;
  let tail = body[0];
  if (head.x === crtBait.x && head.y === crtBait.y) {
    // new bait
    bait = getRandomBaitTile(tiles);
  } else { // cut tail down
    tail = body.shift();
  }

  // 'paint' the new head and remove the old tail
  tiles[bait.x][bait.y] = BAIT;
  tiles[tail.x][tail.y] = NORMAL;
  tiles[head.x][head.y] = SNAKE;

  const iteration = state.iteration + 1;

  return Object.assign({}, state, { iteration, tiles, body, bait });
};
