import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import UpIcon from "@material-ui/icons/ArrowDropUp";
import DownIcon from "@material-ui/icons/ArrowDropDown";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";

class GroceryList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      sortColumn: 'name',
      sortAsc: true
    }
  }

  toggleSort(sortColumn){
    const sortAsc = (this.state.sortColumn !== sortColumn) ? true : !this.state.sortAsc;
    this.setState({
      sortColumn: sortColumn,
      sortAsc: sortAsc
    });
  }

  renderHeaderLink(linkName, linkColumn, printable=false) {
    const activeSort = this.state.sortColumn === linkColumn;
    return (
      <span onClick={() => {this.toggleSort(linkColumn);}} className={this.props.classes.tableHeaderLink}>
        {linkName}
        {activeSort && this.renderSortIcon(printable)}
      </span>
    );
  }

  renderSortIcon(printable = false) {
    if(printable)
        return;
    if(this.state.sortAsc){
      return <UpIcon className={this.props.classes.sortIcon} />;
    } else {
      return <DownIcon className={this.props.classes.sortIcon} />;
    }
  }

  render() {
    const { classes, groceries, printable, tableHeaderColor, foreignKey } = this.props;

    groceries.sort((a, b) => {
      if(foreignKey) {
        if(this.state.sortAsc){
          return a.grocery[this.state.sortColumn] > b.grocery[this.state.sortColumn];
        } else {
          return a.grocery[this.state.sortColumn] < b.grocery[this.state.sortColumn];
        }
      } else {
        if(this.state.sortAsc){
          return a[this.state.sortColumn] > b[this.state.sortColumn];
        } else {
          return a[this.state.sortColumn] < b[this.state.sortColumn];
        }
      }
    });
    var printClass = printable ? "Printable":"Regular";
    if(printable) {
        var checkboxRow = (
            <TableCell className={classes.tableCell}>
                <Checkbox />
            </TableCell>
        );
        var checkboxHead = (
            <TableCell className={classes.tableCell + " " + classes.tableHeadCell} >
                {this.renderHeaderLink('In Basket', 'basket', printable)}
            </TableCell>
        );
    }
    return (
      <div className={`${classes.tableResponsive} ${printClass}`}>
        <Table className={classes.table}>
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {checkboxHead}
              <TableCell className={classes.tableCell + " " + classes.tableHeadCell} >
                {this.renderHeaderLink('Name', 'name', printable)}
              </TableCell>
              <TableCell className={classes.tableCell + " " + classes.tableHeadCell} >
                {this.renderHeaderLink('Amount', 'amount', printable)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groceries.map((grocery, key) => {
              return (
                <TableRow key={key}>
                  {checkboxRow}
                  <TableCell className={classes.tableCell}>
                    {grocery.grocery.name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {grocery.amount}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

GroceryList.defaultProps = {
  tableHeaderColor: "gray"
};

GroceryList.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  groceries: PropTypes.array,
  printable: PropTypes.bool,
  foreignKey: PropTypes.bool
};

export default withStyles(tableStyle)(GroceryList);
