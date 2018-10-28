import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import pageStateService from 'services/pageState';
import Icon from 'ui/Icon';
import { color } from 'tools';
import './index.scss';

const closeSidePage = () => {
  pageStateService.workspaceSidePageChange(false);
};

export default class Header extends PureComponent {
  render() {
    const { name } = this.props;
    return (
      <div className="sidePage-header">
        <div className="sidePage-back" onClick={closeSidePage.bind(this)}>
          <Icon name="#icon-xiazai6" color={color('$white_1')} />
        </div>
        <div className="sidePage-name">{name}</div>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};
