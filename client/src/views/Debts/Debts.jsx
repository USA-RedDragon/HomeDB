import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.jsx";
import DebtsTable from "components/Table/DebtsTable.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Api from 'services/api.js';

class Debts extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
            debts: []
    }

    this.getDebts = this.getDebts.bind(this);

    this.getDebts();
  }

  getDebts() {
    Api.get('debts').then(res => {
      this.setState({debts: res.data});
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
                <h4 className={classes.cardTitleWhite}>Manage Debts</h4>
              </CardHeader>
              <CardBody>

                <Link to="/debt/">
                  <Button color="primary">New Debt</Button>
                </Link>

                <DebtsTable
				  	      debts={this.state.debts}
                />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

Debts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Debts);
