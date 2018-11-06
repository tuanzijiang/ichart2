import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import contentInfoService from 'services/contentInfo';
import CanvasItem from './CanvasItem';
import './index.scss';

const handleDragOver = (ev) => {
  ev.preventDefault();
};

export default class Canvas extends PureComponent {
  constructor(props) {
    super(props);
    this.refDOMs = [];
    this.updateBoundary = this.updateBoundary.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const [rootDOM] = document.getElementsByClassName('canvas-content');
    const [scrollDOM] = document.getElementsByClassName('canvas-main');
    this.rootDOM = rootDOM;
    this.scrollDOM = scrollDOM;
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    this.scrollDOM.scrollTop = snapShot;
  }

  getSnapshotBeforeUpdate() {
    return this.scrollDOM.scrollTop;
  }

  updateBoundary() {
    const childrenDOMs = this.rootDOM.children;
    const childrenClientRect = Array.prototype.map.call(
      childrenDOMs, dom => dom.getBoundingClientRect(),
    );
    this.tops = childrenClientRect.map(rect => rect.top);
  }

  handleDrop(ev) {
    ev.preventDefault();
    this.updateBoundary();
    const { content } = this.props;
    const { keys } = content;
    const newKeys = [].concat(keys);
    const id = ev.dataTransfer.getData('el');
    const currY = ev.clientY;
    const targetIdx = this.tops.reduce((pre, cur, idx) => (
      currY > cur ? idx : pre
    ), 0);
    const originIdx = newKeys.indexOf(id);
    const swapTmp = newKeys[originIdx];
    newKeys[originIdx] = newKeys[targetIdx];
    newKeys[targetIdx] = swapTmp;
    contentInfoService.updateKeys(newKeys);
  }

  handleDelete() {
    const { currItemKey, content } = this.props;
    const { keys } = content;
    const newKeys = [].concat(keys);
    const keyIdx = newKeys.indexOf(currItemKey);
    newKeys.splice(keyIdx, 1);
    contentInfoService.updateKeys(newKeys);
  }

  render() {
    const { content, dragInfo } = this.props;
    const {
      keys, items, dataConfigs, attrs,
    } = content;
    const { dragItemId } = dragInfo;
    return (
      <div className="canvas-wrapper">
        <div className="canvas-main">
          <div
            className="canvas-content"
            onDragOver={handleDragOver}
            onDrop={this.handleDrop}
          >
            {keys.map(key => (
              <CanvasItem
                key={key}
                id={key}
                item={items[key]}
                dataConfig={dataConfigs[key]}
                dataConfigItem={dataConfigs.items[key]}
                attrs={attrs}
                dragItemId={dragItemId}
              />
            ))}
          </div>
        </div>
        <div className="canvas-sideButtons">
          <div className="canvas-sideButton" onClick={this.handleDelete}>删除</div>
          <div className="canvas-sideButton">展示</div>
        </div>
      </div>
    );
  }
}

Canvas.propTypes = {
  content: PropTypes.object.isRequired,
  dragInfo: PropTypes.object.isRequired,
  currItemKey: PropTypes.string.isRequired,
};
