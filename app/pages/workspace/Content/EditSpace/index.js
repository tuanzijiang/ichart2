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
    const { sideArea, sideBarPage, content } = this.props;
    return (
      <div className="editSpace-main">
        <SideBar sideArea={sideArea} sideBarPage={sideBarPage} />
        <SideArea sideArea={sideArea} sideBarPage={sideBarPage} />
        <Canvas content={content} />
        <SideMenu />
      </div>
    );
  }
}

EditSpace.propTypes = {
  sideArea: PropTypes.bool.isRequired,
  sideBarPage: PropTypes.number.isRequired,
  content: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  sideArea: state.pageState.sideArea,
  sideBarPage: state.pageState.sideBarPage,
  content: state.content,
});

export default connect(
  mapStateToProps,
  null,
)(EditSpace);
