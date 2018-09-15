import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";

// @material-ui/icons
import CardFooter from "components/Card/CardFooter.jsx";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GroceryList from "components/Table/GroceryList.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomSpinnerInput from "components/CustomInput/CustomSpinnerInput.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import './GroceriesPage.css'

import Api from 'services/api.js';

class Groceries extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
        groceries: [],
        addedGrocery: {
            id: "1",
            amount: 1
        },
        dialogOpen: false,
        all_groceries: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.getGroceryList = this.getGroceryList.bind(this);
    this.generateList = this.generateList.bind(this);
    this.clearList = this.clearList.bind(this);
    this.printList = this.printList.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleDialogCloseConfirm = this.handleDialogCloseConfirm.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);

    this.getGroceryList();
  }

  addItem() {
    this.setState({dialogOpen: true});
  }

  componentWillMount() {
    Api.get('groceries').then(res => {
      this.setState({ all_groceries: res.data });
    });
  }

  handleChange(event) {
    const name = event.target.name;

    var addedGrocery = this.state.addedGrocery;
    addedGrocery[name] = event.target.value;
    this.setState({
        addedGrocery: addedGrocery
    });
  }

  handleDialogClose() {
    this.setState({dialogOpen: false});
  }

  handleDialogCloseConfirm() {
    this.handleDialogClose();
    console.log(this.state.addedGrocery);
    Api.post('grocery_list', this.state.addedGrocery).then(res => {
        this.setState({addedGrocery: {
            id: "1",
            amount: 1
        }});
        this.setState({groceries: res.data});
    });
  }

  getGroceryList() {
    Api.get('grocery_list').then(res => {
      this.setState({groceries: res.data});
    });
  }

  generateList() {
    Api.get('generate_groceries').then(res => {
        this.setState({groceries: res.data});
    });
  }

  clearList() {
    Api.get('clear_groceries').then(res => {
        this.setState({groceries: []});
    });
  }

  printList() {
      window.print();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
          <Dialog
            open={this.state.dialogOpen}
            onClose={this.handleClose}
          >
          <DialogTitle>Add Grocery</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose an item to add to the list, or <Link to="/grocery">create one</Link>
            </DialogContentText>
            <CustomSpinnerInput
                labelText="Item"
                id="id"
                formControlProps={{
                  fullWidth: true,
                  required: true
                }}
                items={this.state.all_groceries}
                inputProps={{
                  name: 'id',
                  value: this.state.addedGrocery.id,
                  onChange: this.handleChange,
                }}
            />
            <TextField
                id="amount"
                label="Amount"
                value={this.state.addedGrocery.amount}
                onChange={this.handleChange}
                type="number"
                name="amount"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDialogCloseConfirm} color="primary">
              Add Items
            </Button>
          </DialogActions>
        </Dialog>
        <div className="Regular">
            <Grid container>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Manage Groceries</h4>
                </CardHeader>
                <CardBody>

                    <Button color="primary" onClick={this.printList}>Print List</Button>

                    <GroceryList
                        groceries={this.state.groceries}
                    />
                </CardBody>
                <CardFooter>
                <Button type="submit" color="primary" onClick={this.addItem}>Add Grocery</Button>
                <Button color="danger" onClick={this.generateList}>Generate New List</Button>

                <Button color="danger" onClick={this.clearList}>Clear List</Button>

              </CardFooter>
                </Card>
            </GridItem>
            </Grid>
        </div>
        <div className="Printable">
        <Grid container>
            <GridItem xs={12} sm={12} md={12}>
                <GroceryList
                    groceries={this.state.groceries}
                    printable="true"
                />
            </GridItem>
        </Grid>
        </div>
      </div>
    );
  }
}

Groceries.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Groceries);
