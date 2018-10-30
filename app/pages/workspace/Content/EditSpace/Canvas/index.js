/* global echarts */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import contentInfoService, { size } from 'services/contentInfo';
import { shouldMerge } from 'tools';
import pageStateService from 'services/pageState';
import { getDisplayData } from 'services/db';
import { createSeries } from 'services/echarts';
import './index.scss';


const diff = (oldIds, newIds) => {
  const addIds = newIds.reduce((prev, curr) => (
    oldIds.includes(curr) ? prev : prev.concat(curr)
  ), []);
  const deleteIds = oldIds.reduce((prev, curr) => (
    newIds.includes(curr) ? prev : prev.concat(curr)
  ), []);
  const afterAddIds = addIds.reduce((prev, curr) => ({
    ...prev,
    [curr]: newIds[newIds.indexOf(curr) + 1],
  }), {});
  return {
    addIds,
    deleteIds,
    afterAddIds,
  };
};

export default class Canvas extends PureComponent {
  constructor(props) {
    super(props);
    this.handlers = {};
    this.hostDOMs = {};
    this.currKey = '';
    this.updateEcharts = this.updateEcharts.bind(this);
  }

  componentDidMount() {
    const [rootDOM] = document.getElementsByClassName('canvas-content');
    this.rootDOM = rootDOM;
  }

  componentDidUpdate(nextProps, nextState, snapShot) {
    const { addIds } = snapShot;
    this.createAddHandlers(addIds);
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { content } = this.props;
    const oldIds = prevProps.content.keys;
    const newIds = content.keys;
    const { addIds, deleteIds, afterAddIds } = diff(oldIds, newIds);
    this.createAddDOMs(addIds, afterAddIds);
    this.removeDeleteHandlers(deleteIds);
    this.removeDeleteDOMs(deleteIds);
    return {
      addIds,
    };
  }

  createAddDOMs(addIds, afterAddIds) {
    addIds.forEach((addId) => {
      const prefix = addId.split('_')[0];
      const { width, height } = size[prefix];
      const afterId = afterAddIds[addId];
      const hostDOM = document.createElement('div');
      hostDOM.style.height = height;
      hostDOM.style.width = width;
      hostDOM.id = addId;
      hostDOM.onclick = () => {
        pageStateService.workspaceCurrItemKeyChange(addId);
      };
      this.hostDOMs[addId] = hostDOM;
      if (afterId) {
        const afterDOM = this.hostDOMs[afterId];
        hostDOM.insertBefore(afterDOM);
      } else {
        this.rootDOM.append(hostDOM);
      }
    });
  }

  createAddHandlers(addIds) {
    const { content } = this.props;
    const { items } = content;
    addIds.forEach((addId) => {
      const hostDOM = this.hostDOMs[addId];
      const currHandler = echarts.init(hostDOM);
      this.handlers[addId] = currHandler;
      const option = items[addId];
      currHandler.setOption(option);
    });
  }

  removeDeleteDOMs(deleteIds) {
    deleteIds.forEach((deleteId) => {
      const hostDOM = this.hostDOMs[deleteId];
      this.rootDOM.remove(hostDOM);
    });
  }

  removeDeleteHandlers(deleteIds) {
    deleteIds.forEach((deleteId) => {
      this.handlers[deleteId].dispose();
    });
  }

  updateEcharts() {
    const { content, currItemKey } = this.props;
    const { attrs, items } = content;
    const currDataConfig = content.dataConfigs[currItemKey];
    const defaultConfig = ((content.dataConfigs || {}).items || {})[currItemKey] || {};

    if (currDataConfig) {
      const currHandler = this.handlers[currItemKey];
      const { x, y } = currDataConfig;
      const dbX = x.map(xItem => (parseInt(xItem, 10) - 1));
      const dbY = y.map(yItem => (parseInt(yItem, 10) - 1));
      dbY.forEach((yItem) => {
        getDisplayData({
          x: dbX,
          y: yItem,
        }, (data, subKeys) => {
          const updateItem = {
            series: createSeries(data, attrs[yItem], defaultConfig),
            xAxis: {
              data: subKeys,
            },
          };
          currHandler.setOption(updateItem);
          if (shouldMerge(items[currItemKey], updateItem)) {
            contentInfoService.updateEchartsItem(currItemKey, updateItem);
          }
        });
      });
    }
  }

  render() {
    this.updateEcharts();
    return (
      <div className="canvas-main">
        <div className="canvas-content" />
      </div>
    );
  }
}

Canvas.propTypes = {
  content: PropTypes.object.isRequired,
  currItemKey: PropTypes.string.isRequired,
};
