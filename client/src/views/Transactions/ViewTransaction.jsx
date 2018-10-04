import React from "react";
import { withRouter } from 'react-router';
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


class ViewTransactionPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      message: '',
      error: '',
      types: [],
      cards: [],
      type: '',
      place: '',
      date: 'mm/dd/yyyy',
      amount: 0,
      card: '',
      notes: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
  }

  componentWillMount() {
    Api.get('transaction_types').then(res => {
      this.setState({ types: res.data });
    });
    Api.get('accounts').then(res => {
      this.setState({ cards: res.data });
    });
    if(this.props.match.params.id){
      Api.get(`transaction/${this.props.match.params.id}`).then(res => {
        this.setState(Object.assign({}, res.data));
        this.setState({ card: res.data.account.id });
        this.setState({ type: res.data.transaction_type.id });
      });
    }
  }

  saveTransaction(e) {
    e.preventDefault();

    this.setState({
      error: '',
      message: ''
    })

    if(this.props.match.params.id){
      Api.put(`transaction/${this.props.match.params.id}`, this.state).then(res => {
        this.setState({message: 'Transaction saved.'});
      }).catch(err => {
        this.setState({error: err.response.data.message});
      });
    } else {
      Api.post('transaction', this.state).then(res => {
        this.setState({message: 'Transaction saved.'});
        this.props.history.push(`/transaction/${res.data.id}`);
      }).catch(err => {
        this.setState({error: err.response.data.message});
      });
    }
  }

  deleteTransaction() {
    if(window.confirm("Are you sure you want to delete this transaction?")){
      Api.delete(`transaction/${this.props.match.params.id}`).then(res => {
        this.props.history.push('/dashboard');
      });
    }
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
      <form onSubmit={this.saveTransaction}>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Create Transaction</h4>
              </CardHeader>
              <CardBody>
                  <h4>Transaction Details</h4>
                  <CustomSpinnerInput
                    labelText="Type"
                    id="type"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    items={this.state.types}
                    inputProps={{
                      name: 'type',
                      value: this.state.type,
                      onChange: this.handleChange,
                      required: true
                    }}>
                  </CustomSpinnerInput>
                  <CustomInput
                    labelText="Place"
                    id="place"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      name: 'place',
                      value: this.state.place,
                      onChange: this.handleChange,
                      required: true
                    }} />
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
                    labelText="Card"
                    id="card"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    items={this.state.cards}
                    inputProps={{
                      name: 'card',
                      value: this.state.card,
                      onChange: this.handleChange,
                      required: true
                    }}>
                  </CustomSpinnerInput>
                    <CustomInput
                      labelText="Notes"
                      id="notes"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: 'notes',
                        value: this.state.notes,
                        onChange: this.handleChange,
                        multiline: true,
                        rows: 12
                      }} />
              </CardBody>
              <CardFooter>
                {this.props.match.params.id && 
                <Button type="button" onClick={this.deleteTransaction} color="danger">Delete Transaction</Button>
                }
                <Button type="submit" color="primary">Update Transaction</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
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
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ViewTransactionPage));
