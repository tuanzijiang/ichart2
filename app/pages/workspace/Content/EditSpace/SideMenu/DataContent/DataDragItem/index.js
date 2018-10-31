import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DragableItem from 'ui/DragableItem';
import './index.scss';

export default class DataDragItem extends PureComponent {
  render() {
    const {
      text, draggable, handleDrag, dragMergeProps, dragPosition,
    } = this.props;
    const dragableItemMainClass = classnames({
      'dataDragItem-main': true,
      'dataDragItem-main_move': draggable,
    });
    return (
      <DragableItem
        draggable={draggable}
        onDragStart={handleDrag}
        dragMergeProps={dragMergeProps}
        dragPosition={dragPosition}
        id={text}
      >
        <div
          className={dragableItemMainClass}
          id={text}
        >
          <div className="dataDragItem-text">{text}</div>
        </div>
      </DragableItem>
    );
  }
}

DataDragItem.propTypes = {
  text: PropTypes.string,
  draggable: PropTypes.bool,
  handleDrag: PropTypes.func,
  dragMergeProps: PropTypes.object,
  dragPosition: PropTypes.number,
};

DataDragItem.defaultProps = {
  text: '',
  draggable: true,
  handleDrag: () => { },
  dragMergeProps: {},
  dragPosition: 0,
};
