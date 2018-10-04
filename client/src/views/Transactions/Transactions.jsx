import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.jsx";
import TransactionsTable from "components/Table/TransactionsTable.jsx";
import TransactionTypesTable from "components/Table/TransactionTypesTable.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Api from 'services/api.js';

class Transactions extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
			transactions: [],
			transaction_types: []
    }

    this.getTransactions = this.getTransactions.bind(this);

    this.getTransactions();
  }

  getTransactions() {
    Api.get('transactions').then(res => {
      this.setState({transactions: res.data});
    });

    Api.get('transaction_types').then(res => {
      this.setState({transaction_types: res.data});
    });
	}

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
          <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Manage Transactions</h4>
              </CardHeader>
              <CardBody>

                <Link to="/transaction/">
                  <Button color="primary">New Transaction</Button>
                </Link>

                <TransactionsTable
									transactions={this.state.transactions}
                />
              </CardBody>
            </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Manage Transaction Types</h4>
              </CardHeader>
              <CardBody>
                <Link to="/transaction_type/">
                  <Button color="primary">New Transaction Type</Button>
                </Link>

                <TransactionTypesTable
									transaction_types={this.state.transaction_types}
                />

              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

Transactions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Transactions);
