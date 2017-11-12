import { UP, RIGHT, DOWN, LEFT } from '../../directions';
import { START } from '../../redux-stuff/action-types';


const opposites = {
  [UP]: DOWN,
  [DOWN]: UP,
  [RIGHT]: LEFT,
  [LEFT]: RIGHT,
};


export default class GameLoop {
  constructor(store) {
    this.store = store;
    this.siID = null;
    this.unsubscribe = null;
    this.direction = RIGHT;
    this.directionAlreadySet = false;
    this.running = false;
  }

  registerStore(newStore) {
    this.store = newStore;
  }

  setLoopInterval() {
    return setInterval(() => {
      this.directionAlreadySet = false;
      this.store.dispatch({ type: this.direction });
    }, 1000);
  }

  start() {
    if (!this.store) {
      throw new Error('You must register a this.store before starting the game loop!');
    }
    this.unsubscribe = this.store.subscribe(() => {
      const snakeState = this.store.getState().snake;
      if (snakeState.showStartPanel) {
        stop();
      }
    });
    this.siID = this.setLoopInterval();
    this.running = true;
    this.direction = RIGHT;
    this.store.dispatch({ type: START });
  }

  stop() {
    if (this.siID) {
      clearTimeout(this.siID);
    }
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.running = false;
  }

  pause() {
    if (this.siID && this.running) {
      clearInterval(this.siID);
      this.running = false;
    }
  }

  resume() {
    if (!this.running) {
      this.siID = this.setLoopInterval();
      this.running = true;
    }
  }

  setDirection(newDirection) {
    if (this.directionAlreadySet) return;
    if (this.direction === newDirection) return;
    if (newDirection === opposites[this.direction]) return;
    this.direction = newDirection;
    this.directionAlreadySet = true;
  }
}
