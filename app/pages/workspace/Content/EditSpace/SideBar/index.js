import React, { PureComponent } from 'react';
import { rem, color } from 'tools';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pageStateService from 'services/pageState';
import Icon from 'ui/Icon';
import config from './config';
import './index.scss';

export default class SideBar extends PureComponent {
  constructor(props) {
    super(props);
    this.sideItems = config.sideItems;
    this.state = {
      mouseOverIdx: null,
    };
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

  handleClick(idx) {
    const { sideArea, sideBarPage } = this.props;
    const nextSideArea = !sideArea || sideBarPage !== idx;
    const nextSideBarPage = idx;
    pageStateService.workspaceSideBarIdxAndArea(nextSideArea, nextSideBarPage);
  }

  render() {
    const { mouseOverIdx } = this.state;
    const { sideArea, sideBarPage } = this.props;
    const sideBarWrapper = classnames({
      'workspace-sideBarWrapper': true,
      'workspace-sideBarWrapper_active': sideArea,
    });
    return (
      <div className={sideBarWrapper}>
        <div className="workspace-sideBar">
          {this.sideItems.map((sideItem, idx) => (
            <div
              className="workspace-sideItem"
              key={sideItem}
              onClick={this.handleClick.bind(this, idx)}
              onMouseEnter={this.handleMouseEnter.bind(this, idx)}
              onMouseLeave={this.handleMouseLeave.bind(this)}
            >
              {mouseOverIdx === idx || sideBarPage === idx
                ? <Icon name={sideItem} fontSize={rem(26)} color={color('$blue_1')} />
                : <Icon name={sideItem} fontSize={rem(26)} color={color('$white_1')} />
              }
            </div>
          ))}
        </div>
        <div className="workspace-sideBarPlaceHolder" />
      </div>
    );
  }
}

SideBar.propTypes = {
  sideArea: PropTypes.bool.isRequired,
  sideBarPage: PropTypes.number.isRequired,
};
