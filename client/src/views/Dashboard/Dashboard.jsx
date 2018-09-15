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
import AccountsTable from "components/Table/AccountsTable.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Api from 'services/api.js';

class Dashboard extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      transactions: [],
      accounts: []
    }

    this.getTransactions = this.getTransactions.bind(this);

    this.getTransactions();

    this.getAccounts = this.getAccounts.bind(this);

    this.getAccounts();
  }
  
  getTransactions() {
    Api.get('transactions', { params: { limit: 5 }}).then(res => {
      this.setState({transactions: res.data});
    });
  }

  getAccounts() {
    Api.get('accounts').then(res => {
      this.setState({accounts: res.data});
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
                <h4 className={classes.cardTitleWhite}>Recent Transactions</h4>
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
                <h4 className={classes.cardTitleWhite}>Accounts</h4>
              </CardHeader>
              <CardBody>
                
                <Link to="/account/">
                  <Button color="primary">Add Account</Button>
                </Link>

                <AccountsTable
                  accounts={this.state.accounts}
                />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
