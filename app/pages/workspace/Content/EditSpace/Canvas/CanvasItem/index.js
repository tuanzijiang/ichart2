/* global echarts */
import React, { PureComponent } from 'react';
import contentInfoService, { size } from 'services/contentInfo';
import PropTypes from 'prop-types';
import pageStateService from 'services/pageState';
import DragableItem from 'ui/DragableItem';
import { getDisplayData } from 'services/db';
import { createSeries } from 'services/echarts';
import { shouldMerge } from 'tools';
import { defaultTypes } from 'constants';
import './index.scss';

const handleDragCanvasItem = (ev) => {
  ev.dataTransfer.setData('el', ev.target.id);
  const mergeObj = {
    dragItemId: ev.target.id,
  };
  pageStateService.workspaceUpdateDragInfo(mergeObj);
};

export default class CanvasItem extends PureComponent {
  componentDidMount() {
    const { item } = this.props;
    this.handler = echarts.init(this.hostDOM);
    this.handler.setOption(item);
  }

  componentDidUpdate() {
    const {
      id, item, dataConfig, dataConfigItem: defaultConfig, attrs,
    } = this.props;

    const { x, y } = dataConfig;
    const dbX = x.map(xItem => (parseInt(xItem, 10) - 1));
    const dbY = y.map(yItem => (parseInt(yItem, 10) - 1));
    let tmpSeries = [];
    dbY.forEach((yItem, yIdx) => {
      getDisplayData({
        x: dbX,
        y: yItem,
      }, (data, subKeys, mainKeys) => {
        const series = createSeries(data, attrs[yItem], defaultConfig, mainKeys);
        tmpSeries = tmpSeries.concat(series);
        if (yIdx === dbY.length - 1) {
          let updateItem = null;
          if (defaultConfig.defaultType === defaultTypes[2]) {
            const legendData = tmpSeries[0].data.map(v => v.name);
            updateItem = {
              series: [
                tmpSeries[0],
              ],
              legend: {
                data: legendData,
              },
            };
          } else {
            const legendData = tmpSeries.map(v => v.name);
            updateItem = {
              series: tmpSeries,
              xAxis: {
                data: subKeys,
              },
              legend: {
                data: legendData,
              },
            };
          }
          if (shouldMerge(item, updateItem)) {
            const oldOption = this.handler.getOption();
            this.handler.setOption({
              ...oldOption,
              ...updateItem,
            }, true);
            contentInfoService.updateEchartsItem(id, updateItem);
          }
        }
      });
    });
  }

  componentWillUnmount() {
    this.handler.dispose();
  }

  render() {
    const { id } = this.props;
    const prefix = id.split('_')[0];
    const { width, height } = size[prefix];
    const style = {
      width,
      height,
    };
    const dragMergeProps = {
      className: 'canvaseItem-main',
      onClick: () => { pageStateService.workspaceCurrItemKeyChange(id); },
    };
    return (
      <DragableItem
        id={id}
        dragPosition={4}
        dragMergeProps={dragMergeProps}
        onDragStart={handleDragCanvasItem}
      >
        <div
          className="canvasItem-content"
          ref={(el) => { this.hostDOM = el; }}
          style={style}
        />
      </DragableItem>
    );
  }
}

CanvasItem.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  dataConfig: PropTypes.object.isRequired,
  dataConfigItem: PropTypes.object.isRequired,
  attrs: PropTypes.array.isRequired,
};
