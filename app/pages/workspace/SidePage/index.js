import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Header from './Header';
import Content from './Content';
import './index.scss';

export default class SidePage extends PureComponent {
  render() {
    const {
      sidePage, name, sidePageIdx, uploadStepIdx,
    } = this.props;
    const sidePageClass = classnames({
      'sidepage-main': true,
      'sidepage-main_active': sidePage,
    });

    return (
      <div className={sidePageClass}>
        <Header name={name} />
        <Content sidePageIdx={sidePageIdx} uploadStepIdx={uploadStepIdx} />
      </div>
    );
  }
}

SidePage.propTypes = {
  sidePage: PropTypes.bool.isRequired,
  name: PropTypes.string,
  sidePageIdx: PropTypes.number,
  uploadStepIdx: PropTypes.number,
};

SidePage.defaultProps = {
  name: '',
  sidePageIdx: 0,
  uploadStepIdx: 0,
};
