import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
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
    const { workspacePage } = this.props;
    return (
      <div className="workspace-wrapper">
        <Header switchWorkspacePage={this.switchWorkspacePage} />
        <Content workspacePage={workspacePage} />
      </div>
    );
  }
}

WorkSpace.propTypes = {
  workspacePage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  workspacePage: state.pageState.workspacePage,
});

export default connect(
  mapStateToProps,
  null,
)(WorkSpace);
