import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { rem, color } from 'tools';
import './index.scss';

class Icon extends PureComponent {
  render() {
    const { name, fontSize, color } = this.props;
    const style = {
      fontSize,
      color,
    };
    return (
      <div className="icon-main" style={style}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={name} />
        </svg>
      </div>
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  color: PropTypes.string,
};

Icon.defaultProps = {
  fontSize: rem(20),
  color: color('$white_1'),
};

export default Icon;
