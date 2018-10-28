import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import SidePage from './SidePage';
import Content from './Content';
import './index.scss';

class WorkSpace extends PureComponent {
  constructor(props) {
    super(props);
    this.title = 'workspace';
    document.title = this.title;
    this.switchWorkspacePage = this.switchWorkspacePage.bind(this);
  }

  switchWorkspacePage(idx) {
    this.setState(() => ({
      workspacePage: idx,
    }));
  }

  render() {
    const {
      workspacePage, sidePage, sidePageName, sidePageIdx, uploadStepIdx,
    } = this.props;
    return (
      <div className="workspace-wrapper">
        <Header switchWorkspacePage={this.switchWorkspacePage} />
        <Content workspacePage={workspacePage} />
        <SidePage
          sidePage={sidePage}
          name={sidePageName}
          sidePageIdx={sidePageIdx}
          uploadStepIdx={uploadStepIdx}
        />
      </div>
    );
  }
}

WorkSpace.propTypes = {
  workspacePage: PropTypes.number.isRequired,
  sidePage: PropTypes.bool.isRequired,
  sidePageName: PropTypes.string.isRequired,
  sidePageIdx: PropTypes.number.isRequired,
  uploadStepIdx: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  workspacePage: state.pageState.workspacePage,
  sidePage: state.pageState.sidePage,
  sidePageName: state.pageState.sidePageName,
  sidePageIdx: state.pageState.sidePageIdx,
  uploadStepIdx: state.pageState.uploadStepIdx,
});

export default connect(
  mapStateToProps,
  null,
)(WorkSpace);
