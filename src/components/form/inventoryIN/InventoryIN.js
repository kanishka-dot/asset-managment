import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import DateFnsUtils from "@date-io/date-fns";
import CurrentDate from "../../utils/Date";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Paper, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "auto",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

export default function InventoryIN() {
  const classes = useStyles();

  const [value, setValue] = React.useState({
    docno: "",
    date: new Date(CurrentDate()),
    itemcode: "",
    itemid: "",
    diliveryperson: "",
    supplierno: "",
    cost: "",
    warranty: "",
    serialno: "",
  });

  const handleChange = (props) => (event) => {
    setValue({ ...value, [props]: event.target.value });
  };

  const handleDateChange = (date) => {
    setValue({ ...value, date: date });
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Inventory GRN
          </Typography>
          <Grid container spacing={3}>
          <Box component="span" m={1}>
          <Grid item xs={12} >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid  >
                  <KeyboardDatePicker
                    disableToolbar          
                    variant="outline"
                    format="dd/MM/yyyy"
                    id="date-picker-inline"
                    label="Date"
                    value={value.date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} >
              <TextField         
                id="docno"
                label="Document No"
                name="docno"
                value={value.docno}
                onChange={handleChange("docno")}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField     
                id="supplierno"
                label="Supplier No"
                name="supplierno"
                value={value.supplierno}
                onChange={handleChange("supplierno")}
              />
            </Grid>
            
            <Grid item xs={12} >
              <TextField  
                id="itemcode"
                label="Item Code"
                name="itemcode"
                value={value.itemcode}
                onChange={handleChange("itemcode")}
              />
            </Grid>
            </Box>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="itemid"
                label="Item ID"
                name="itemid"
                value={value.itemid}
                onChange={handleChange("itemid")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="diliveryperson"
                label="Delivery person"
                name="diliveryperson"
                value={value.diliveryperson}
                onChange={handleChange("diliveryperson")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="cost"
                label="Cost"
                name="cost"
                value={value.diliveryperson}
                onChange={handleChange("cost")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="barcode"
                label="Barcode"
                name="barcode"
                value={value.diliveryperson}
                onChange={handleChange("barcode")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="serialno"
                label="Serial No"
                name="serialno"
                value={value.diliveryperson}
                onChange={handleChange("serialno")}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="warranty"
                label="Warranty"
                name="warranty"
                value={value.diliveryperson}
                onChange={handleChange("warranty")}
              />
            </Grid>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
}
