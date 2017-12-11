import React, { Component } from 'react';
import getControllableComponent from './getControllableComponent';

class Input extends Component {

  render() {
    return (
      <input type="text" value={this.props.value} onChange={e => this.props.onRequestChange(e.target.value)} />
    );
  }

}

export default getControllableComponent(Input);
