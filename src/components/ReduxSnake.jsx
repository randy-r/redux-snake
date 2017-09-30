import React from 'react';

export default class ReduxSnake extends React.Component {

  getText = () => ('---redux---snake---')

  render() {
    return <div>{this.getText()}</div>;
  }
}
