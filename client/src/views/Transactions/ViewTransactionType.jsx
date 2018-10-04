import React from "react";
import { withRouter } from 'react-router';
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


class ViewTransactionPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      message: '',
      error: '',
      name: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.saveTransactionType = this.saveTransactionType.bind(this);
    this.deleteTransactionType = this.deleteTransactionType.bind(this);
  }

  componentWillMount() {
    if(this.props.match.params.id){
      Api.get(`transaction_type/${this.props.match.params.id}`).then(res => {
        this.setState(Object.assign({}, res.data));
      });
    }
  }

  saveTransactionType(e) {
    e.preventDefault();

    this.setState({
      error: '',
      message: ''
    })

    if(this.props.match.params.id){
      Api.put(`transaction_type/${this.props.match.params.id}`, this.state).then(res => {
        this.setState({message: 'Transaction saved.'});
      }).catch(err => {
        this.setState({error: err.response.data.message});
      });
    } else {
      Api.post('transaction_type', this.state).then(res => {
        this.setState({message: 'Transaction Type saved.'});
        this.props.history.push(`/transaction_type/${res.data.id}`);
      }).catch(err => {
        this.setState({error: err.response.data.message});
      });
    }
  }

  deleteTransactionType() {
    if(window.confirm("Are you sure you want to delete this transaction?")){
      Api.delete(`transaction_type/${this.props.match.params.id}`).then(res => {
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
      <form onSubmit={this.saveTransactionType}>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Create Transaction Type</h4>
              </CardHeader>
              <CardBody>
                  <h4>Transaction Type</h4>
                  <CustomInput
                    labelText="Type"
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
              </CardBody>
              <CardFooter>
                {this.props.match.params.id && 
                <Button type="button" onClick={this.deleteTransactionType} color="danger">Delete Transaction Type</Button>
                }
                <Button type="submit" color="primary">Update Transaction Type</Button>
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
