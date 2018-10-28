import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

export default class Step extends PureComponent {
  render() {
    const { texts, currIdx } = this.props;
    const num = texts.length;
    return (
      <div className="sidepage-step">
        {num > 0 && texts.map((text, idx) => {
          const className = classnames({
            'sidepage-stepItem': true,
            'sidepage-stepItem_active': idx <= currIdx,
          });

          return (
            <div className={className} key={text}>
              <div className="sidepage-stepText">{text}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

Step.propTypes = {
  texts: PropTypes.array,
  currIdx: PropTypes.number,
};

Step.defaultProps = {
  texts: [],
  currIdx: 0,
};
