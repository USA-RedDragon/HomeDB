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
  },
  textField: {
    width: "100%"
  }
};

class Settings extends React.Component {

  constructor(props, context) {
    super(props.context);

    this.state = {
      message: '',
      error: '',
      dummy: '',
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
   
    Api.put('user/current', this.state).then(res => {
      this.setState({message: 'Account updated.'});
    }).catch(err => {
      this.setState({error: err.response.data.message});
    });
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
                <h4 className={classes.cardTitleWhite}>Settings</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>

                    <p>Dummy Settings until we need them</p>

                    <CustomInput
                      labelText="Dummy"
                      id="dummy"
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        name: 'dummy',
                        value: this.state.dummy,
                        onChange: this.handleChange,
                        multiline: true,
                        rows: 12
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

export default withStyles(styles)(Settings);
