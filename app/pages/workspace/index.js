import React, { PureComponent } from 'react';

export default class WorkSpace extends PureComponent {
  constructor(props) {
    super(props);
    this.title = 'workspace';
  }

  render() {
    return (
      <div>{this.title}</div>
    );
  }
}
