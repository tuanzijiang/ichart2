import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import SideArea from './SideArea';
import Canvas from './Canvas';
import SideMenu from './SideMenu';
import './index.scss';

class EditSpace extends PureComponent {
  render() {
    const {
      sideArea, sideBarPage, content, currItemKey, sideMenuPageIdx,
    } = this.props;
    const sideMenuPlaceHolderClass = classnames({
      'editSpace-sideMenuPlaceHolder': true,
      'editSpace-sideMenuPlaceHolder_active': currItemKey.length,
    });

    return (
      <div className="editSpace-main">
        <SideBar sideArea={sideArea} sideBarPage={sideBarPage} />
        <SideArea sideArea={sideArea} sideBarPage={sideBarPage} />
        <Canvas content={content} />
        <div className={sideMenuPlaceHolderClass} />
        <SideMenu currItemKey={currItemKey} sideMenuPageIdx={sideMenuPageIdx} />
      </div>
    );
  }
}

EditSpace.propTypes = {
  sideArea: PropTypes.bool.isRequired,
  sideBarPage: PropTypes.number.isRequired,
  content: PropTypes.object.isRequired,
  currItemKey: PropTypes.string.isRequired,
  sideMenuPageIdx: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  sideArea: state.pageState.sideArea,
  sideBarPage: state.pageState.sideBarPage,
  content: state.content,
  currItemKey: state.pageState.currItemKey,
  sideMenuPageIdx: state.pageState.sideMenuPageIdx,
});

export default connect(
  mapStateToProps,
  null,
)(EditSpace);
