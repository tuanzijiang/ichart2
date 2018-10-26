import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import contentInfoService from 'services/contentInfo';
import './index.scss';

export default class SideAreaItem extends PureComponent {
  handleClick(idx) {
    const { content } = this.props;
    contentInfoService.addGraphics(content.configs[idx]);
  }

  renderSingleItem() {
    const { content } = this.props;
    return (
      <div className="sideAreaItem-single" onClick={this.handleClick.bind(this, 0)}>
        <div className="sideAreaItem-singleImg">
          <img src={content.imgs[0]} alt={content.name} />
        </div>
        <div className="sideAreaItem-singleName">
          {content.showName && content.name}
        </div>
      </div>
    );
  }

  renderMulItem() {
    const { content } = this.props;
    return (
      <div className="sideAreaItem-single" onClick={this.handleClick.bind(this, 0)}>
        <div className="sideAreaItem-singleImg">
          <img src={content.imgs[0]} alt={content.name} />
        </div>
        <div className="sideAreaItem-singleName">
          {content.showName && content.name}
        </div>
      </div>
    );
  }

  render() {
    const { content } = this.props;
    return (
      <div className="sideAreaItem-main">
        {content.number === 1 && this.renderSingleItem()}
        {content.number > 1 && this.renderMulItem()}
      </div>
    );
  }
}

SideAreaItem.propTypes = {
  content: PropTypes.object.isRequired,
};
