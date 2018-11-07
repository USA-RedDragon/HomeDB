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

class ViewAccount extends React.Component {

  constructor(props, context) {
    super(props.context);

    this.state = {
      message: '',
      error: '',
      name: '',
      balance: 0.0,
      routing_number: '',
      account_number: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.saveAccount = this.saveAccount.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentWillMount() {
    if(this.props.match.params.id){
      Api.get(`account/${this.props.match.params.id}`).then(res => {
        this.setState(Object.assign({}, res.data));
      });
    }
  }

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  saveAccount(e) {
    e.preventDefault();

    this.setState({error: '', message: ''});

    if(this.props.match.params.id){
      Api.put(`account/${this.props.match.params.id}`, this.state).then(res => {
        this.setState({message: 'Account saved.'});
      }).catch(err => {
        this.setState({error: err.response.data.message});
      });
    } else {
      Api.post('account', this.state).then(res => {
        this.setState({message: 'Account added.'});
        this.props.history.push(`/account/${res.data.id}`);
      }).catch(err => {
        this.setState({error: err.response.data.message});
      });
    }
  }

  deleteAccount() {
    if(window.confirm("Are you sure you want to delete this account?")){
      Api.delete(`account/${this.props.match.params.id}`).then(res => {
        this.props.history.push('/accounts');
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.saveAccount}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Bank Accounts</h4>
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
                        labelText="Balance"
                        id="balance"
                        formControlProps={{
                          fullWidth: true,
                          required: true
                        }}
                        inputProps={{
                          name: 'balance',
                          value: this.state.balance,
                          onChange: this.handleChange
                        }} />
                      <CustomInput
                        labelText="Routing Number"
                        id="routing_number"
                        formControlProps={{
                          fullWidth: true,
                          required: true
                        }}
                        inputProps={{
                          name: 'routing_number',
                          value: this.state.routing_number,
                          onChange: this.handleChange
                        }} />
                      <CustomInput
                        labelText="Account Number"
                        id="account_number"
                        formControlProps={{
                          fullWidth: true,
                          required: true
                        }}
                        inputProps={{
                          name: 'account_number',
                          value: this.state.account_number,
                          onChange: this.handleChange
                        }} />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                {this.props.match.params.id && 
                <Button type="button" onClick={this.deleteAccount} color="danger">Delete Account</Button>
                }

                <Button type="submit" color="primary">Save Account</Button>
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

export default withStyles(styles)(ViewAccount);
