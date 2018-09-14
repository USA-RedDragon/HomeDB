import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.jsx";
import UsersTable from "components/Table/UsersTable.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Api from 'services/api.js';

class Users extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
			users: [],
			currentUser: {}
    }

    this.getUsers = this.getUsers.bind(this);

    this.getUsers();
    this.getCurrentUser();
  }

  getUsers() {
    Api.get('user').then(res => {
      this.setState({users: res.data});
    });
	}


  getCurrentUser() {
    Api.get('user/current').then(res => {
      this.setState({currentUser: res.data});
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Manage Users</h4>
              </CardHeader>
              <CardBody>

                <Link to="/user/">
                  <Button color="primary">New User</Button>
                </Link>

                <UsersTable
									users={this.state.users}
									currentUser={this.state.currentUser}
                />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Users);
