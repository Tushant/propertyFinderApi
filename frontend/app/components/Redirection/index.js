import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import intersection from 'lodash/intersection';
import { showDialog } from 'containers/App/actions';
import Login from 'containers/Login';

const mapDispatchToProps = dispatch => ({
  showDialog: dialog => dispatch(showDialog(dialog))
});
// allowedRoles.filter(role => user_role.indexOf(role) > 0).length > 0
const Redirection = allowedRoles => WrappedComponent =>
  class Redirection extends React.PureComponent {
    render() {
      const user_instance = JSON.parse(localStorage.getItem('user'));
      if (!user_instance) {
        return <Redirect to="/" />;
      }
      if (
        user_instance &&
        intersection(allowedRoles, user_instance.userInfo.user_role).length > 0
      ) {
        return <WrappedComponent {...this.props} />;
      }
      return <Redirect to="/" />;
    }
  };

export default props => WrappedComponent =>
  connect(null, mapDispatchToProps)(Redirection(props)(WrappedComponent));
