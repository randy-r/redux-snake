# redux-snake
[![npm version](https://badge.fury.io/js/redux-snake.svg)](https://badge.fury.io/js/redux-snake)

ReduxSnake is a react component that renders a playable snake game. The project was intended as a fun Redux utilisation.

## Play it [here](https://randy-r.github.io/sierpinski.html)!



## Usage
### **Node**

Install:

`$ npm install --save redux-snake` or `$ yarn add redux-snake`

Code:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ReduxSnake } from 'redux-snake'; // or require('redux-snake').ReduxSnake;

// ReduxSnake will take the full width of the containing element
ReactDOM.render((
  <div style={{ width: '70%' }}>
    <ReduxSnake />
  </div >),
  document.getElementById('snake-root'),
);
```
If you already have an app that uses Redux you can add the snakeReducer to the store and simply put ReduxSnake in the hierarchy:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ReduxSnake, snakeReducer } from 'redux-snake';
// or require('redux-snake').ReduxSnake and require('redux-snake').snakeReducer;

import App from '../component/App';

// Assuming you have a store and at least one reducer
const appReducer = (state = { msg: 'I am a state from an app that uses redux-snake' }) => state;
const appStore = createStore(
  combineReducers({
    app: appReducer,
    snake: snakeReducer, // be sure that the key is named 'snake'
  }), {}
);

ReactDOM.render(
  <Provider store={appStore} >
    <div>
      <App />
      <ReduxSnake />
    </div>
  </Provider >
  document.getElementById('root'),
);
```

### **Browser**
Use it as UMD library:
```html
<script crossorigin src="https://unpkg.com/redux-snake/umd/redux-snake.min.js"></script>
```

Code:

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script> 
<script crossorigin src="https://unpkg.com/redux-snake/umd/redux-snake.min.js"></script>
<div id="snake-root"></div>
<script>
  const ReduxSnake = reduxsnake.ReduxSnake;
  ReactDOM.render(React.createElement(ReduxSnake), document.getElementById('snake-root'));
</script>
```
## Licence
This project is licensed under the terms of the MIT license.
