import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import SideArea from './SideArea';
import Canvas from './Canvas';
import SideMenu from './SideMenu';
import './index.scss';

class EditSpace extends PureComponent {
  render() {
    const { sideArea, sideBarPage } = this.props;
    return (
      <div className="editSpace-main">
        <SideBar sideArea={sideArea} sideBarPage={sideBarPage} />
        <SideArea sideArea={sideArea} sideBarPage={sideBarPage} />
        <Canvas />
        <SideMenu />
      </div>
    );
  }
}

EditSpace.propTypes = {
  sideArea: PropTypes.bool.isRequired,
  sideBarPage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  sideArea: state.pageState.sideArea,
  sideBarPage: state.pageState.sideBarPage,
});

export default connect(
  mapStateToProps,
  null,
)(EditSpace);
