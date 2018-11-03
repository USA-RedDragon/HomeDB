import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import Api from "services/api.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends React.Component {

  constructor(props, context) {
    super(props.context);

    this.state = {
      message: '',
      error: '',
      name: '',
      phone_number: '',
      email: '',
      username: '',
      current_password: '',
      password: '',
      confirm_password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  componentDidMount() {
    Api.get('user/current').then(res => {
      this.setState(Object.assign({}, res.data));
    })
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  saveUser(e) {
    e.preventDefault();

    this.setState({error: '', message: ''});
    if(this.state.password !== '' && this.state.current_password === '') {
      this.setState({error: "Please enter your existing password;"});
    } else if(this.state.password !== this.state.confirm_password){
      this.setState({error: "Passwords do not match."});
    } else {
      Api.put('user/current', this.state).then(res => {
        this.setState({message: 'Account updated.'});
      }).catch(err => {
        this.setState({error: err.response.data.message});
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.saveUser}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Manage My Account</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>

                    <CustomInput
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        name: 'name',
                        value: this.state.name,
                        onChange: this.handleChange,
                        required: true
                      }} />
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        name: 'username',
                        value: this.state.username,
                        onChange: this.handleChange,
                        required: true
                      }} />
                      <CustomInput
                        labelText="Phone #"
                        id="phone_number"
                        formControlProps={{
                          fullWidth: true,
                          required: true
                        }}
                        inputProps={{
                          name: 'phone_number',
                          value: this.state.phone_number,
                          onChange: this.handleChange
                        }} />
                      <CustomInput
                        labelText="Email"
                        id="user_email"
                        formControlProps={{
                          fullWidth: true,
                          required: true
                        }}
                        inputProps={{
                          name: 'email',
                          value: this.state.email,
                          type: 'email',
                          onChange: this.handleChange
                        }} />

                      <h4>Change Password</h4>
                        <CustomInput
                          labelText="Current Password"
                          id="current_password"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: 'password',
                            name: 'current_password',
                            value: this.state.current_password,
                            onChange: this.handleChange
                          }} />
                        <CustomInput
                          labelText="New Password"
                          id="password"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: 'password',
                            name: 'password',
                            value: this.state.password,
                            onChange: this.handleChange
                          }} />
                        <CustomInput
                          labelText="Confirm Password"
                          id="confirm_password"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: 'password',
                            name: 'confirm_password',
                            value: this.state.confirm_password,
                            onChange: this.handleChange
                          }} />

                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary">Update Account</Button>
              </CardFooter>
            </Card>
            </form>
            <Snackbar
              place="tr"
              color="success"
              message={this.state.message}
              open={!!this.state.message}
              closeNotification={() => this.setState({message:''})}
              close
            />
            <Snackbar
              place="tr"
              color="danger"
              message={this.state.error}
              open={!!this.state.error}
              closeNotification={() => this.setState({error:''})}
              close
            />
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
