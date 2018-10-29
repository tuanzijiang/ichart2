import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SliderButton from 'ui/SliderButton';
import { rem } from 'tools';
import DataContent from './DataContent';
import SettingContent from './SettingContent';
import config from './config';
import './index.scss';

export default class SideMenu extends PureComponent {
  render() {
    const { currItemKey, sideMenuPageIdx } = this.props;
    const sideMenuClass = classnames({
      'sideMenu-main': true,
      'sideMenu-main_active': currItemKey.length,
    });
    const currItemPrefix = currItemKey.split('_')[0];
    const currItemConfig = config[currItemPrefix];
    let texts = null;
    let clickHandlers = null;

    if (currItemConfig) {
      texts = currItemConfig.map(configItem => configItem.text);
      clickHandlers = currItemConfig.map(configItem => configItem.clickHandler);
    }
    return (
      <div className={sideMenuClass}>
        {currItemConfig
          && (
            <SliderButton
              texts={texts}
              width={rem(225)}
              height={rem(50)}
              fontSize={rem(16)}
              percentage={0.9}
              clickHandlers={clickHandlers}
            />
          )
        }
        {
          currItemConfig && sideMenuPageIdx === 0
          && (
            <DataContent />
          )
        }
        {
          currItemConfig && sideMenuPageIdx === 1
          && (
            <SettingContent />
          )
        }
      </div>
    );
  }
}

SideMenu.propTypes = {
  currItemKey: PropTypes.string.isRequired,
  sideMenuPageIdx: PropTypes.number.isRequired,
};
