import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from '@material-ui/core/NativeSelect';
// core components
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle";

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    items,
    id,
    labelProps,
    inputProps,
    error,
    success
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  if(items[0] && items[0].id !== -1) {
    //Add a blank item to not cover the prompt
    items.unshift({id: -1, name: ""});
  }
  return (
    <FormControl
        {...formControlProps}
        className={formControlProps.className + " " + classes.formControl}
    >
        <InputLabel
            className={classes.labelRoot + labelClasses}
            htmlFor={id}
            {...labelProps}
        >
            {labelText}
        </InputLabel>
        <NativeSelect
            {...inputProps}
        >
            { items.map((item, key) => <option key={key} value={item.id}>{item.name}</option>) }
        </NativeSelect>
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  items: PropTypes.array,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
