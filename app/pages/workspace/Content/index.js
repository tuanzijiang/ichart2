import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DataSrcSpace from './DataSrcSpace';
import EditSpace from './EditSpace';
import TableSpace from './TableSpace';
import './index.scss';

export default class Content extends PureComponent {
  render() {
    const { workspacePage } = this.props;
    const editClassname = classnames({
      'workspace-subPage': true,
      'workspace-subpage_active': workspacePage === 0,
    });
    const tableClassname = classnames({
      'workspace-subPage': true,
      'workspace-subpage_active': workspacePage === 1,
    });
    const dataSrcClassname = classnames({
      'workspace-subPage': true,
      'workspace-subpage_active': workspacePage === 2,
    });

    return (
      <div className="workspace-content">
        <div className={editClassname}>
          <EditSpace />
        </div>
        <div className={tableClassname}>
          <TableSpace />
        </div>
        <div className={dataSrcClassname}>
          <DataSrcSpace />
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  workspacePage: PropTypes.number,
};

Content.defaultProps = {
  workspacePage: 0,
};
