import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import pageStateService, { DRAG_POSITION } from 'services/pageState';
import './index.scss';

export default class DragableItem extends PureComponent {
  render() {
    const {
      draggable, onDragStart, children, id, dragPosition, dragMergeProps,
    } = this.props;
    return (
      <div
        draggable={draggable}
        onDragStart={(ev) => {
          const mergeObj = {
            fromPosition: DRAG_POSITION[dragPosition],
          };
          pageStateService.workspaceUpdateDragInfo(mergeObj);
          onDragStart(ev);
        }}
        id={id}
        {...dragMergeProps}
      >
        {children}
      </div>
    );
  }
}

DragableItem.propTypes = {
  children: PropTypes.any,
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  dragPosition: PropTypes.number,
  id: PropTypes.string,
  dragMergeProps: PropTypes.object,
};

DragableItem.defaultProps = {
  children: '',
  id: '',
  draggable: true,
  onDragStart: () => { },
  dragPosition: 0,
  dragMergeProps: {},
};
