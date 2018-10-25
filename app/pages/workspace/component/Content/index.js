import React, { PureComponent } from 'react';
import image from 'app/public/avatar1.png';

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <img src={image} />
  }
}
