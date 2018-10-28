import React from "react";
import PropTypes from "prop-types";

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

  renderHeaderLink(linkName, linkColumn) {
    const activeSort = this.state.sortColumn === linkColumn;
    return (
      <span onClick={() => {this.toggleSort(linkColumn)}} className={this.props.classes.tableHeaderLink}>
        {linkName}
        {activeSort && this.renderSortIcon(linkColumn)}
      </span>
    );
  }

  renderSortIcon() {
    if(this.state.sortAsc){
      return <UpIcon className={this.props.classes.sortIcon} />;
    } else {
      return <DownIcon className={this.props.classes.sortIcon} />;
    }
  }

  render() {
    const { classes, groceries, tableHeaderColor } = this.props;
    groceries.sort((a, b) => {
      if(this.state.sortAsc){
        return a[this.state.sortColumn] > b[this.state.sortColumn];
      } else {
        return a[this.state.sortColumn] < b[this.state.sortColumn];
      }
    });
    return (
      <div className={`${classes.tableResponsive}`}>
        <Table className={classes.table}>
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              <TableCell className={classes.tableCell + " " + classes.tableHeadCell} >
                {this.renderHeaderLink('Name', 'name')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groceries.map((grocery, key) => {
              return (
                <TableRow key={key}>
                  <TableCell className={classes.tableCell}>
                    {grocery.name}
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
};

export default withStyles(tableStyle)(GroceryList);
