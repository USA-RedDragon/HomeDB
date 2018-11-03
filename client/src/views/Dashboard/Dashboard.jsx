import React from "react";
import PropTypes from "prop-types";
import ChartistGraph from "react-chartist";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import Money from "@material-ui/icons/Money";
import List from "@material-ui/icons/List";
import Info from "@material-ui/icons/Info";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import TransactionsTable from "components/Table/TransactionsTable.jsx";
import Api from 'services/api.js';
import formatter from "services/formatter"

import {
  weeklyTransactionsChart,
  monthlyBalancesChart,
  yearlyDebtsChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0,
    transactions: [],
    total_money: 0,
    total_todos: 0,
    financial_state: "Good",
    weeklyTransactionsChartData: {},
    monthlyBalancesChartData: {}
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount() {
    Api.get('transactions', { params: { limit: 5 }}).then(res => {
        this.setState({transactions: res.data});
    });
    Api.get('total_money').then(res => {
      this.setState({total_money: res.data});
    });
    Api.get('todo_count').then(res => {
      this.setState({total_todos: res.data});
    });
    Api.get('financial_state').then(res => {
      this.setState({financial_state: res.data});
    });
    Api.get('weekly_transactions').then(res => {
      this.setState({weeklyTransactionsChartData: res.data});
    });
    Api.get('monthly_balances').then(res => {
      this.setState({monthlyBalancesChartData: res.data});
    });
    Api.get('yearly_debts').then(res => {
      console.log(res.data)
      this.setState({yearlyDebtsChartData: res.data});
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Money />
                </CardIcon>
                <p className={classes.cardCategoryWhite}>Total Money</p>
                <h3 className={classes.cardTitleWhite}>{formatter.format(this.state.total_money)}</h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <List />
                </CardIcon>
                <p className={classes.cardCategoryWhite}>Todo List</p>
                <h3 className={classes.cardTitleWhite}>{this.state.total_todos} items</h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Info />
                </CardIcon>
                <p className={classes.cardCategoryWhite}>Financial Status</p>
                <h3 className={classes.cardTitleWhite}>{this.state.financial_state}</h3>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.weeklyTransactionsChartData}
                  type="Line"
                  options={weeklyTransactionsChart.options}
                  listener={weeklyTransactionsChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitleWhite}>Weekly Transactions</h4>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.monthlyBalancesChartData}
                  type="Line"
                  options={monthlyBalancesChart.options}
                  responsiveOptions={monthlyBalancesChart.responsiveOptions}
                  listener={monthlyBalancesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitleWhite}>Monthly Finances</h4>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.yearlyDebtsChartData}
                  type="Line"
                  options={yearlyDebtsChart.options}
                  listener={yearlyDebtsChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitleWhite}>Yearly Debts</h4>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary" stats>
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
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
