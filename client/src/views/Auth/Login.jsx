import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import axios from "axios";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Logo from "components/Logo/Logo.jsx";

import Auth from "services/auth.js";

const styles = {
  wrapper: {
    textAlign: "center"
  }
}

class Login extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
      error: ''
		};

		this.imgConfig = {
			width: '200px',
			title: 'HomeDB'
		};

    this.login = this.login.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillMount() {
    if(Auth.isLoggedIn()){
      window.location = '/dashboard';
    }
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  login(e) {
    e.preventDefault();
    this.setState({error: ''});
    
    axios.post("https:/homesever.mcswainsoftware.com/test/api/login", {username: this.state.username, password: this.state.password})
    .then(res => {
      Auth.setToken(res.data.token);
      //refresh page
      window.location = '/dashboard';
    }).catch(err => {
      this.setState({error: err.response.data.message});
    })
  }

  render() {
    const { classes } = this.props;
    return (
    <div className={classes.wrapper}>
      <Grid container
        alignItems="center"
        justify="center">
        <GridItem md={4}>
          <h1><Logo config={this.imgConfig} /></h1>
          <h3>Login</h3>

          {this.state.error &&
            <SnackbarContent color="danger" message={this.state.error} />
          }

          <form onSubmit={this.login}>
          <CustomInput
            labelText="Username"
            id="login-username"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: this.handleUsernameChange
            }} />
            <CustomInput
              labelText="Password"
              id="login-password"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "password",
                onChange: this.handlePasswordChange
              }}
              />
            <Button type="submit" color="primary">Login</Button>
            </form>
          </GridItem>
        </Grid>
    </div>
    );
  }

}

Login.propTypes = {
  classes: PropTypes.object,
};

export default withRouter(withStyles(styles)(Login));
