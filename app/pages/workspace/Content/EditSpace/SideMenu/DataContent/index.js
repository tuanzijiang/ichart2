import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import contentInfoService from 'services/contentInfo';
import pageStateService, { DRAG_POSITION } from 'services/pageState';
import { obtainByKey } from 'services/db';
import Icon from 'ui/Icon';
import DataDragItem from './DataDragItem';
import './index.scss';

const handleDragAllAttr = (ev) => {
  ev.dataTransfer.setData('el', ev.target.id);
  const mergeObj = {
    data_type: ev.target.getAttribute('data_type'),
  };
  pageStateService.workspaceUpdateDragInfo(mergeObj);
};

const handleDragXY = (ev) => {
  ev.dataTransfer.setData('el', ev.target.id);
};

const handleDragOver = (ev) => {
  ev.preventDefault();
};

const clearDragInfluence = () => {
  const mergeObj = {
    fromPosition: DRAG_POSITION[0],
  };
  pageStateService.workspaceUpdateDragInfo(mergeObj);
};

const xParentPrefix = 'xDragableItem';
const yParentPrefix = 'yDragableItem';

export default class DataContent extends PureComponent {
  constructor(props) {
    super(props);
    this.handleDropX = this.handleDropX.bind(this);
    this.handleDropY = this.handleDropY.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleDropDelete = this.handleDropDelete.bind(this);
  }

  componentDidMount() {
    obtainByKey('title', (data) => {
      contentInfoService.updateAttrs(data.map((v, i) => (`${i + 1}:${v || ''}`)));
    });
    obtainByKey('dataType', (data) => {
      contentInfoService.updateAttrTypes(data);
    });
  }

  handleDropX(ev) {
    ev.preventDefault();
    const { dataConfigs, currItemKey, dragInfo } = this.props;
    const { fromPosition } = (dragInfo || {});
    if (fromPosition === DRAG_POSITION[1]) {
      const currConfig = dataConfigs[currItemKey];
      const oldX = currConfig.x || [];
      const data = ev.dataTransfer.getData('el');
      const newX = oldX.includes(data) ? oldX : oldX.concat(data);
      contentInfoService.updateX(currItemKey, newX);
    }
    clearDragInfluence();
  }

  handleDropY(ev) {
    ev.preventDefault();
    const { dataConfigs, currItemKey, dragInfo } = this.props;
    const { fromPosition } = (dragInfo || {});
    if (fromPosition === DRAG_POSITION[1]) {
      const currConfig = dataConfigs[currItemKey];
      const oldY = currConfig.y || [];
      const data = ev.dataTransfer.getData('el');
      const newY = oldY.includes(data) ? oldY : oldY.concat(data);
      contentInfoService.updateY(currItemKey, newY);
    }
    clearDragInfluence();
  }

  handleDropDelete(ev) {
    ev.preventDefault();
    const { dataConfigs, currItemKey, dragInfo } = this.props;
    const { fromPosition } = (dragInfo || {});
    const currConfig = dataConfigs[currItemKey];
    if (fromPosition === DRAG_POSITION[2]) {
      const oldX = currConfig.x || [];
      const data = ev.dataTransfer.getData('el');
      const dataIdx = oldX.indexOf(data);
      if (dataIdx !== -1) {
        const newX = [].concat(oldX);
        newX.splice(dataIdx, 1);
        contentInfoService.updateX(currItemKey, newX);
      }
    }
    if (fromPosition === DRAG_POSITION[3]) {
      const oldY = currConfig.y || [];
      const data = ev.dataTransfer.getData('el');
      const dataIdx = oldY.indexOf(data);
      if (dataIdx !== -1) {
        const newY = [].concat(oldY);
        newY.splice(dataIdx, 1);
        contentInfoService.updateY(currItemKey, newY);
      }
    }
    clearDragInfluence();
  }

  handleMouseEnter() {
    this.setState(() => ({
      mouseOverDelete: true,
    }));
  }

  handleMouseLeave() {
    this.setState(() => ({
      mouseOverDelete: false,
    }));
  }

  render() {
    const {
      dataConfigs, currItemKey, attrs, attrTypes, dragInfo,
    } = this.props;
    const { data_type: dataType, fromPosition } = (dragInfo || {});
    const currConfig = dataConfigs[currItemKey];
    const { x, y } = currConfig;
    return (
      <div className="dataContent-main">
        <div className="dataContent-itemAll">
          <div className="dataContent-title">选择要添加到表格的字段:</div>
          <div className="dataContent-box">
            {attrs.map(
              (attr, idx) => {
                const dragMergeProps = {
                  data_type: attrTypes[idx],
                };
                return (
                  <DataDragItem
                    attrTypes={attrTypes}
                    text={attr}
                    key={attr}
                    handleDrag={handleDragAllAttr}
                    attrType={idx}
                    dragMergeProps={dragMergeProps}
                    dragPosition={1}
                  />
                );
              },
            )
            }
          </div>
        </div>
        <div className="dataContent-itemAll">
          <div className="dataContent-title">x轴:</div>
          <div className="dataContent-boxWrapper">
            <div className="dataContent-box" onDragOver={handleDragOver} onDrop={this.handleDropX}>
              {x.map(xItem => <DataDragItem text={xItem} key={`${xParentPrefix}_${xItem}`} dragPosition={2} handleDrag={handleDragXY} />)}
            </div>
          </div>
        </div>
        <div className="dataContent-itemAll">
          <div className="dataContent-title">y轴:(仅数值)</div>
          <div className="dataContent-boxWrapper">
            {fromPosition === DRAG_POSITION[1] && dataType !== 'n' && <div className="dataContent-mask" />}
            <div className="dataContent-box" onDragOver={handleDragOver} onDrop={this.handleDropY}>
              {y.map(yItem => <DataDragItem text={yItem} key={`${yParentPrefix}_${yItem}`} dragPosition={3} handleDrag={handleDragXY} />)}
            </div>
          </div>
        </div>
        <div className="dataContent-itemDelete">
          {fromPosition !== DRAG_POSITION[2] && fromPosition !== DRAG_POSITION[3] && <div className="dataContent-mask" />}
          <div
            className="dataContent-delete"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onDragOver={handleDragOver}
            onDrop={this.handleDropDelete}
          >
            <Icon name="#icon-shanchu" />
          </div>
        </div>
      </div>
    );
  }
}

DataContent.propTypes = {
  dataConfigs: PropTypes.object.isRequired,
  currItemKey: PropTypes.string.isRequired,
  attrs: PropTypes.array.isRequired,
  attrTypes: PropTypes.array.isRequired,
  dragInfo: PropTypes.object.isRequired,
};
