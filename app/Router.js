import React, { PureComponent } from 'react';
import {
  Route, Switch, Redirect, Router,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'services/history';
import WorkSpace from './pages/workspace';
import Login from './pages/login';

class GlobalRouter extends PureComponent {
  render() {
    const { isLogin } = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route path="/workspace" component={WorkSpace} />
          <Route path="/login" component={Login} />
          <Redirect to={isLogin ? '/workspace' : '/login'} />
        </Switch>
      </Router>
    );
  }
}

GlobalRouter.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLogin: state.userInfo.isLogin,
});

export default connect(
  mapStateToProps,
  null,
)(GlobalRouter);
