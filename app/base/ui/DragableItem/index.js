import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { rem } from 'tools';
import './index.scss';

export default class DragableItem extends PureComponent {
  render() {
    const {
      text, height, width, draggable, handleDrag,
    } = this.props;
    const dragableItemMainClass = classnames({
      'dragableItem-main': true,
      'dragableItem-main_move': draggable,
    });
    return (
      <div
        className={dragableItemMainClass}
        style={{ height, width }}
        draggable={draggable}
        onDragStart={handleDrag}
        id={text}
      >
        <div className="dragableItem-text">{text}</div>
      </div>
    );
  }
}

DragableItem.propTypes = {
  text: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  draggable: PropTypes.bool,
  handleDrag: PropTypes.func,
};

DragableItem.defaultProps = {
  text: '',
  height: rem(30),
  width: '100%',
  draggable: true,
  handleDrag: () => { },
};
