import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class Avatar extends PureComponent {
  render() {
    const { url, height, width } = this.props;
    return (
      <div className="avatar-main" style={{ height, width }}>
        <img className="avatar-img" src={url} alt="avatar" />
      </div>
    );
  }
}

Avatar.propTypes = {
  url: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

Avatar.defaultProps = {
  url: './public/img/avatar-default.jpeg',
  height: '100%',
  width: '100%',
};
