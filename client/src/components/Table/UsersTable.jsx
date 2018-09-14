import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";

function UsersTable({ ...props }) {
  const { classes, currentUser, users, tableHeaderColor } = props;

  const tableHead = ['Name', 'Username', 'Email'];

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
          <TableRow>
            {tableHead.map((prop, key) => {
              return (
                <TableCell
                  className={classes.tableCell + " " + classes.tableHeadCell}
                  key={key}
                >
                  {prop}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, key) => {
            return (
              <TableRow key={key}>
                <TableCell className={classes.tableCell}>
								{ (currentUser.id === user.id) ? (
                  <Link to={'/profile'}>{user.name}</Link>
								) : (
                  <Link to={`/user/${user.id}`}>{user.name}</Link>
								)}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {user.username}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {user.email}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

UsersTable.defaultProps = {
  tableHeaderColor: "gray"
};

UsersTable.propTypes = {
	classes: PropTypes.object.isRequired,
	currentUser: PropTypes.object,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  users: PropTypes.array,
};

export default withStyles(tableStyle)(UsersTable);
