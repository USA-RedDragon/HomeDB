import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSpinnerInput from "components/CustomInput/CustomSpinnerInput.jsx";
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

class PaychecksPage extends React.Component {

  constructor(props, context) {
    super(props.context);

    this.state = {
      message: '',
      error: '',
      amount: 0,
      date: 'mm/dd/yyyy',
      account: 0,
      accounts: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.savePaycheck = this.savePaycheck.bind(this);
    this.deletePaycheck = this.deletePaycheck.bind(this);
  }

  componentWillMount() {
    if(this.props.match.params.id){
      Api.get(`paycheck/${this.props.match.params.id}`).then(res => {
        this.setState(Object.assign({}, res.data));
        this.setState({ account: res.data.accountId });
      });
    }
  }

  componentDidMount() {
    Api.get('accounts').then(res => {
      this.setState({ accounts: res.data });
    });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  savePaycheck(e) {
    e.preventDefault();
    this.setState({error: '', message: ''});

    if(this.props.match.params.id) {
      Api.put(`paycheck/${this.props.match.params.id}`, this.state).then(res => {
        this.setState({message: 'Paycheck saved.'});
      }).catch(err => {
        this.setState({error: err.response.data.message});
      });
    } else {
      Api.post('paycheck', this.state).then(res => {
        this.setState({message: 'Paycheck added.'});
        this.props.history.push(`/paycheck/${res.data.id}`);
      }).catch(err => {
        this.setState({error: err.response.data.message});
      });
    }
  }

  deletePaycheck() {
    if(window.confirm("Are you sure you want to delete this paycheck?")){
      Api.delete(`paycheck/${this.props.match.params.id}`).then(res => {
        this.props.history.push('/paychecks');
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.savePaycheck}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add Paycheck</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>
                    
                    <CustomInput
                      labelText="Date"
                      id="date"
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        name: 'date',
                        type: 'date',
                        value: this.state.date,
                        onChange: this.handleChange,
                        required: true
                      }} />
                    <CustomInput
                      labelText="Amount"
                      id="amount"
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        name: 'amount',
                        value: this.state.amount,
                        onChange: this.handleChange
                      }} />
                    <CustomSpinnerInput
                    labelText="Account"
                    id="account"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    items={this.state.accounts}
                    inputProps={{
                      name: 'account',
                      value: this.state.account,
                      onChange: this.handleChange,
                      required: true
                    }} />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                {this.props.match.params.id && 
                <Button type="button" onClick={this.deletePaycheck} color="danger">Delete Paycheck</Button>
                }

                <Button type="submit" color="primary">Save Paycheck</Button>
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

export default withStyles(styles)(PaychecksPage);
