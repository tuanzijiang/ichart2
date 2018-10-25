import React, { PureComponent } from 'react';
import Header from './component/Header';
import Content from './component/Content';
import './index.scss';

export default class WorkSpace extends PureComponent {
  constructor(props) {
    super(props);
    this.title = 'workspace';
    document.title = this.title;
  }

  render() {
    return (
      <div className="workspace-wrapper">
        <div className="workspace-header">
          <Header />
        </div>
        <div className="workspace-content">
          <Content />
        </div>
      </div>
    );
  }
}
