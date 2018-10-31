import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CanvasItem from './CanvasItem';
import './index.scss';

export default class Canvas extends PureComponent {
  componentDidMount() {
    const [rootDOM] = document.getElementsByClassName('canvas-content');
    this.rootDOM = rootDOM;
  }

  render() {
    const { content } = this.props;
    const {
      keys, items, dataConfigs, attrs,
    } = content;
    return (
      <div className="canvas-main">
        <div className="canvas-content">
          {keys.map(key => (
            <CanvasItem
              key={key}
              id={key}
              item={items[key]}
              dataConfig={dataConfigs[key]}
              dataConfigItem={dataConfigs.items[key]}
              attrs={attrs}
            />
          ))}
        </div>
      </div>
    );
  }
}

Canvas.propTypes = {
  content: PropTypes.object.isRequired,
};
