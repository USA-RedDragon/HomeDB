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
import AllGroceryList from "components/Table/AllGroceryList.jsx";
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
        all_groceries: [],
        grocery_list: [],
        default_groceries: [],
        
        dialogOpen: false,
        addGroceryListItem: "",
        addGroceryListAmount: 0,

        defaultDialogOpen: false,
        addDefaultGroceryListItem: "",
        addDefaultGroceryListAmount: 0,
        
        groceryDialogOpen: false,
        allGroceriesDialogName: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.generateList = this.generateList.bind(this);
    this.clearList = this.clearList.bind(this);
    this.printList = this.printList.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addGrocery = this.addGrocery.bind(this);
    this.addDefaultItem = this.addDefaultItem.bind(this);
    this.clearDefaultList = this.clearDefaultList.bind(this);
    this.handleDialogCloseConfirm = this.handleDialogCloseConfirm.bind(this);
    this.handleDefaultDialogCloseConfirm = this.handleDefaultDialogCloseConfirm.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleGroceryDialogCloseConfirm = this.handleGroceryDialogCloseConfirm.bind(this);
  }

  addItem() {
    this.setState({dialogOpen: true});
  }

  addDefaultItem() {
    this.setState({defaultDialogOpen: true});
  }

  addGrocery() {
    this.setState({groceryDialogOpen: true});
  }

  componentDidMount() {
    Api.get('groceries').then(res => {
      this.setState({ all_groceries: res.data });
    });
    Api.get('default_groceries').then(res => {
      this.setState({ default_groceries: res.data });
    });
    Api.get('grocery_list').then(res => {
      this.setState({grocery_list: res.data});
    });
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleDialogClose() {
    this.setState({dialogOpen: false});
    this.setState({defaultDialogOpen: false});
    this.setState({groceryDialogOpen: false});
  }

  handleDialogCloseConfirm() {
    this.handleDialogClose();
    Api.post('grocery_list', {
      id: this.state.addGroceryListItem,
      amount: this.state.addGroceryListAmount
    }).then(res => {
      this.setState({addGroceryListItem: ""});
      this.setState({addGroceryListAmount: 0});
      this.setState({grocery_list: res.data});
    });
  }

  handleDefaultDialogCloseConfirm() {
    this.handleDialogClose();
    Api.post('default_grocery_list', {
      id: this.state.addDefaultGroceryListItem,
      amount: this.state.addDefaultGroceryListAmount
    }).then(res => {
      this.setState({addDefaultGroceryListItem: ""});
      this.setState({addDefaultGroceryListAmount: ""});
      this.setState({default_groceries: res.data});
    });
  }

  handleGroceryDialogCloseConfirm() {
    this.handleDialogClose();
    Api.post('groceries', { name: this.state.allGroceriesDialogName}).then(res => {
        this.setState({allGroceriesDialogName: ""});
        var temp_groceries = this.state.all_groceries;
        temp_groceries.push(res.data);
        this.setState({all_groceries: temp_groceries});
    });
  }

  generateList() {
    Api.post('generate_groceries').then(res => {
        this.setState({grocery_list: res.data});
    });
  }

  clearList() {
    Api.delete('clear_groceries').then(res => {
        this.setState({grocery_list: []});
    });
  }

  clearDefaultList() {
    Api.delete('clear_default_groceries').then(res => {
        this.setState({default_groceries: []});
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
                  name: 'addGroceryListItem',
                  value: this.state.addGroceryListItem,
                  onChange: this.handleChange,
                }}
            />
            <TextField
                id="amount"
                label="Amount"
                value={this.state.addGroceryListAmount}
                onChange={this.handleChange}
                type="number"
                name="addGroceryListAmount"
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
        <Dialog
            open={this.state.defaultDialogOpen}
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
                  name: 'addDefaultGroceryListItem',
                  value: this.state.addDefaultGroceryListItem,
                  onChange: this.handleChange,
                }}
            />
            <TextField
                id="amount"
                label="Amount"
                value={this.state.addDefaultGroceryListAmount}
                onChange={this.handleChange}
                type="number"
                name="addDefaultGroceryListAmount"
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
            <Button onClick={this.handleDefaultDialogCloseConfirm} color="primary">
              Add Items
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
            open={this.state.groceryDialogOpen}
            onClose={this.handleClose}
          >
          <DialogTitle>Add Grocery</DialogTitle>
          <DialogContent>
            <TextField
                id="name"
                label="Name"
                value={this.state.allGroceriesDialogName}
                onChange={this.handleChange}
                name="allGroceriesDialogName"
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
            <Button onClick={this.handleGroceryDialogCloseConfirm} color="primary">
              Add Item
            </Button>
          </DialogActions>
        </Dialog>
        <div className="Regular">
            <Grid container>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Manage Grocery List</h4>
                </CardHeader>
                <CardBody>

                    <Button color="primary" onClick={this.printList}>Print List</Button>

                    <GroceryList
                        groceries={this.state.grocery_list}
                        foreignKey
                    />
                </CardBody>
                <CardFooter>
                <Button type="submit" color="primary" onClick={this.addItem}>Add Grocery</Button>
                <Button color="danger" onClick={this.generateList}>Generate New List</Button>

                <Button color="danger" onClick={this.clearList}>Clear List</Button>

              </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Default Grocery List</h4>
                </CardHeader>
                <CardBody>
                    <GroceryList
                        groceries={this.state.default_groceries}
                        foreignKey
                    />
                </CardBody>
                <CardFooter>
                <Button type="submit" color="primary" onClick={this.addDefaultItem}>Add Grocery</Button>
                <Button color="danger" onClick={this.clearDefaultList}>Clear List</Button>

              </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>All Groceries</h4>
                </CardHeader>
                <CardBody>
                    <AllGroceryList
                        groceries={this.state.all_groceries}
                    />
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary" onClick={this.addGrocery}>Add Grocery</Button>
                </CardFooter>
                </Card>
            </GridItem>
          </Grid>
        </div>
        <div className="Printable">
          <GroceryList
            groceries={this.state.grocery_list}
            printable
          />
        </div>
      </div>
    );
  }
}

Groceries.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Groceries);
