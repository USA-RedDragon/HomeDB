import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import Api from "services/api.js";
import Auth from "services/auth.js";

class Logout extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.logout();
  }

  logout() {    
    Api.post('logout')
    .then(() => {
      Auth.logout();
      this.props.history.push('/login');
    }).catch(() => {
      // remove token either way
      Auth.logout();
      this.props.history.push('/login');
    })
  }

  render() {
    return null;
  }

}

Logout.propTypes = {
  classes: PropTypes.object,
};

export default withRouter(Logout);