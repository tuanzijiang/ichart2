/* global echarts */
import React, { PureComponent } from 'react';
import contentInfoService, { size } from 'services/contentInfo';
import PropTypes from 'prop-types';
import pageStateService from 'services/pageState';
import { getDisplayData } from 'services/db';
import { createSeries } from 'services/echarts';
import { shouldMerge } from 'tools';
import './index.scss';

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
      }, (data, subKeys) => {
        const series = createSeries(data, attrs[yItem], defaultConfig);
        tmpSeries = tmpSeries.concat(series);
        if (yIdx === dbY.length - 1) {
          const legendData = tmpSeries.map(v => v.name);
          const updateItem = {
            series: tmpSeries,
            xAxis: {
              data: subKeys,
            },
            legend: {
              data: legendData,
            },
          };
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
    return (
      <div
        className="canvasItem-main"
        id={id}
        ref={(el) => { this.hostDOM = el; }}
        style={style}
        onClick={() => { pageStateService.workspaceCurrItemKeyChange(id); }}
      />
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
