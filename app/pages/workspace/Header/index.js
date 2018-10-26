import React, { PureComponent } from 'react';
import pageStateService from 'services/pageState';
import Icon from 'ui/Icon';
import SliderButton from 'ui/SliderButton';
import Avatar from 'ui/Avatar';
import './index.scss';
import { rem } from 'tools';

export default class Header extends PureComponent {
  render() {
    const texts = ['编辑区', '工作表', '数据源'];
    const clickHandlers = texts.map((text, idx) => () => {
      pageStateService.workspacePageChange(idx);
    });
    return (
      <div className="workspace-header">
        <div className="workspace-icon">
          <Icon name="#icon-keshihuashujuETL" color="#5aa7ef" fontSize={rem(28)} />
        </div>
        <div className="workspace-logo">iChart</div>
        <SliderButton
          width={rem(360)}
          fontSize={rem(16)}
          texts={texts}
          clickHandlers={clickHandlers}
        />
        <div className="workspace-placeholder" />
        <div className="workspace-avatar">
          <Avatar height={rem(40)} width={rem(40)} />
        </div>
      </div>
    );
  }
}
