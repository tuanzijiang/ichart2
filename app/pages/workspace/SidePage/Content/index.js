import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import UploadSpace from './UploadSpace';
import './index.scss';


export default class Content extends PureComponent {
  render() {
    const { sidePageIdx, uploadStepIdx } = this.props;
    return (
      <div className="sidepage-content">
        {sidePageIdx === 0 && <UploadSpace uploadStepIdx={uploadStepIdx} />}
      </div>
    );
  }
}

Content.propTypes = {
  sidePageIdx: PropTypes.number.isRequired,
  uploadStepIdx: PropTypes.number.isRequired,
};
