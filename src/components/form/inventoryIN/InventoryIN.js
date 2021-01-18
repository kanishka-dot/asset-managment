import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import DateFnsUtils from '@date-io/date-fns';
import CurrentDate from '../../utils/Date'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  


export default function InventoryIN() {

  const [value, setValue] = React.useState({
    docno: "",
    date: new Date(CurrentDate()),
    itemcode: "",
    itemid: "",
    diliveryperson: "",
    supplierno: "",
    cost: "",
  });

  const handleChange = (props) => (event) => {
    setValue({ ...value, [props]: event.target.value });
  };


  const handleDateChange = (date) => {
    setValue({...value,date:date});
  };



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Inventory GRN
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="docno"
            label="Document No"
            name="docno"
            value={value.docno}
            onChange={handleChange("docno")}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="itemcode"
            label="Item Code"
            name="itemcode"
            value={value.itemcode}
            onChange={handleChange("itemcode")}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="itemid"
            label="Item ID"
            name="itemid"
            value={value.itemid}
            onChange={handleChange("itemid")}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="supplierno"
            label="Supplier No"
            name="supplierno"
            value={value.supplierno}
            onChange={handleChange("supplierno")}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="diliveryperson"
            label="Delivery person"
            name="diliveryperson"
            value={value.diliveryperson}
            onChange={handleChange("diliveryperson")}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="cost"
            label="Cost"
            name="cost"
            value={value.diliveryperson}
            onChange={handleChange("cost")}
          />
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={value.date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
    </React.Fragment>
  );
}
