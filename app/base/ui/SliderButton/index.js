import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { rem, color as colorSwitcher } from 'tools';
import classnames from 'classnames';
import './index.scss';

export default class SliderButton extends PureComponent {
  constructor(props) {
    super(props);
    const {
      texts, width, position,
    } = this.props;
    const itemNum = texts.length;
    this.silderWidth = itemNum ? parseFloat(width, 10) / itemNum : 0;
    this.state = {
      position,
      mouseOverIdx: null,
    };
  }

  handleClick(idx) {
    const { clickHandlers } = this.props;
    this.setState(() => ({
      position: idx,
    }));
    const clickHandler = clickHandlers[idx];
    if (Object.prototype.toString.apply(clickHandler, this) === '[object Function]') {
      clickHandler();
    }
  }

  handleMouseEnter(idx) {
    this.setState(() => ({
      mouseOverIdx: idx,
    }));
  }

  handleMouseLeave() {
    this.setState(() => ({
      mouseOverIdx: null,
    }));
  }

  render() {
    const {
      height, width, color, texts, fontSize, percentage,
    } = this.props;
    const {
      position, mouseOverIdx,
    } = this.state;
    const classname = classnames({
      'sliderbutton-main': true,
      'sliderbutton-main_active': mouseOverIdx === position,
    });
    return (
      <div
        className={classname}
        style={{
          height, width, color, fontSize,
        }}
      >
        {texts.map((text, idx) => (
          <div
            className="sliderbutton-item"
            onClick={this.handleClick.bind(this, idx)}
            onMouseEnter={this.handleMouseEnter.bind(this, idx)}
            onMouseLeave={this.handleMouseLeave.bind(this)}
            key={text}
          >
            {text}
          </div>
        ))
        }
        <div className="sliderbutton-bottom" style={{ left: `${position * this.silderWidth}rem`, width: `${this.silderWidth}rem` }}>
          <div className="sliderbutton-body" style={{ width: `${100 * percentage}%` }} />
        </div>
      </div>
    );
  }
}

SliderButton.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  texts: PropTypes.array,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  percentage: PropTypes.number,
  position: PropTypes.number,
  clickHandlers: PropTypes.array,
};

SliderButton.defaultProps = {
  height: '100%',
  width: '100%',
  color: colorSwitcher('$white_1'),
  position: 0,
  percentage: 1,
  fontSize: rem(20),
  texts: [],
  clickHandlers: [],
};
