import React from 'react';


class ReduxSnake extends React.Component {

  constructor(props) {
    super(props);
    setInterval(() => {
      props.doChange();
    }, 800);
  }

  render() {
    return (
      <div>{this.props.text}</div>
    );
  }
}

export default ReduxSnake;

