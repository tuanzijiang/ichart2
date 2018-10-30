import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DragableItem from 'ui/DragableItem';
import contentInfoService from 'services/contentInfo';
import { obtainByKey } from 'services/db';
import './index.scss';

const handleDrag = (ev) => {
  ev.dataTransfer.setData('el', ev.target.id);
};

const handleDragOver = (ev) => {
  ev.preventDefault();
};

const xParentPrefix = 'xDragableItem';
const yParentPrefix = 'yDragableItem';

export default class DataContent extends PureComponent {
  constructor(props) {
    super(props);
    this.handleDropX = this.handleDropX.bind(this);
    this.handleDropY = this.handleDropY.bind(this);
  }

  componentDidMount() {
    obtainByKey('title', (data) => {
      contentInfoService.updateAttrs(data.map((v, i) => (`${i + 1}:${v || ''}`)));
    });
  }

  handleDropX(ev) {
    ev.preventDefault();
    const { dataConfigs, currItemKey } = this.props;
    const currConfig = dataConfigs[currItemKey];
    const oldX = currConfig.x || [];
    const data = ev.dataTransfer.getData('el');
    const newX = oldX.includes(data) ? oldX : oldX.concat(data);
    contentInfoService.updateX(currItemKey, newX);
  }

  handleDropY(ev) {
    ev.preventDefault();
    const { dataConfigs, currItemKey } = this.props;
    const currConfig = dataConfigs[currItemKey];
    const oldY = currConfig.y || [];
    const data = ev.dataTransfer.getData('el');
    const newY = oldY.includes(data) ? oldY : oldY.concat(data);
    contentInfoService.updateY(currItemKey, newY);
  }

  render() {
    const { dataConfigs, currItemKey, attrs } = this.props;
    const currConfig = dataConfigs[currItemKey];
    const { x, y } = currConfig;
    return (
      <div className="dataContent-main">
        <div className="dataContent-itemAll">
          <div className="dataContent-title">选择要添加到表格的字段:</div>
          <div className="dataContent-box">
            {attrs.map(attr => <DragableItem text={attr} key={attr} handleDrag={handleDrag} />)}
          </div>
        </div>
        <div className="dataContent-itemAll">
          <div className="dataContent-title">x轴:</div>
          <div className="dataContent-box" onDragOver={handleDragOver} onDrop={this.handleDropX}>
            {x.map(xItem => <DragableItem text={xItem} key={`${xParentPrefix}_${xItem}`} />)}
          </div>
        </div>
        <div className="dataContent-itemAll">
          <div className="dataContent-title">y轴:</div>
          <div className="dataContent-box" onDragOver={handleDragOver} onDrop={this.handleDropY}>
            {y.map(yItem => <DragableItem text={yItem} key={`${yParentPrefix}_${yItem}`} />)}
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
};
