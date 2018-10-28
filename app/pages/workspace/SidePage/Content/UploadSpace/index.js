import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'ui/FileUploader';
import Step from '../Step';
import './index.scss';

const texts = ['1. 上传文件', '2. 预览数据', '3. 设置属性'];

export default class UploadSpace extends PureComponent {
  render() {
    const { uploadStepIdx } = this.props;
    return (
      <div className="uploadspace-main">
        <div className="uploadspace-stepWrapper">
          <Step texts={texts} currIdx={uploadStepIdx} />
        </div>
        {uploadStepIdx === 0
          && (
            <div className="uploadspace-file">
              <div className="uploadspace-fileBox">
                <FileUploader />
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

UploadSpace.propTypes = {
  uploadStepIdx: PropTypes.number.isRequired,
};
