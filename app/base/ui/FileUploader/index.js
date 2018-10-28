import React, { PureComponent } from 'react';
import excel from 'services/excel';
import './index.scss';

const handleChange = (event) => {
  const currFile = event.target.files[0];
  excel.read(currFile);
};

export default class FileUploader extends PureComponent {
  render() {
    return (
      <div className="fileuploader-main">
        <input type="file" className="fileuploader-input" onChange={handleChange} />
      </div>
    );
  }
}
