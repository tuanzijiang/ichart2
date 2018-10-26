import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { rem } from 'tools';
import PropTypes from 'prop-types';
import SliderButton from 'ui/SliderButton';
import SideAreaItem from './SideAreaItem';
import configs from './config';
import './index.scss';

export default class SideArea extends PureComponent {
  render() {
    const { sideArea, sideBarPage } = this.props;
    const config = configs[sideBarPage];
    const sideAreaMain = classnames({
      'sideArea-main': true,
      'sideArea-main_active': sideArea,
    });
    return (
      <div className={sideAreaMain}>
        <div className="sideArea-title">
          <SliderButton
            width={rem(180)}
            fontSize={rem(16)}
            texts={[config.name]}
          />
          {
            config.contents && config.contents.map(content => (
              <SideAreaItem content={content} key={content.name} />
            ))
          }
        </div>
      </div>
    );
  }
}

SideArea.propTypes = {
  sideArea: PropTypes.bool.isRequired,
  sideBarPage: PropTypes.number.isRequired,
};
