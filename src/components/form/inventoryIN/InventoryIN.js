import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import DateFnsUtils from "@date-io/date-fns";
import CurrentDate from "../../utils/Date";
import Table from "../../Table/Table";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { Paper, Box, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

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

  button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },

  buttonSave: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: "8rem",
  },

  btn: {
    display: "flex",
    alignItems: "baseline",
    flexDirection: "row-reverse",
  },

  heading: {
    marginBottom: theme.spacing(3),
  },
}));

export default function InventoryIN() {
  const classes = useStyles();
  const data = [];
  const responsive = "vertical";
  const tableBodyHeight = "100%";
  const tableBodyMaxHeight = "";

  const options = {
    elevation:5,
    filter: false,
    print:false,
    download:false,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
  };
  const header = [
    "Document No",
    "Date",
    "Item Code",
    "Supplier No",
    "Serial No",
    "Barcode",
    "Cost",
    "Warranty Period",
    "Delivery Persion",
  ];

  const [tableData, setData] = React.useState([]);

  const [value, setValue] = React.useState({
    docno: "",
    date: CurrentDate(),
    itemcode: "",
    supplierno: "",
    serialno: "",
    barcode: "",
    cost: "",
    warranty: "",
    diliveryperson: "",
  });

  const initialState = {
    docno: "",
    date: CurrentDate(),
    itemcode: "",
    itemid: "",
    diliveryperson: "",
    supplierno: "",
    cost: "",
    warranty: "",
    serialno: "",
    barcode: "",
  };

  const handleChange = (props) => (event) => {
    setValue({ ...value, [props]: event.target.value });
  };

  const handleDateChange = (date) => {
    setValue({ ...value, date: date });
  };

  const handleClear = () => {
    setValue({ ...initialState });
  };

  const addData = () => {
    if(value.docno){
      const arry = Object.values(value);
      tableData.push(arry)
      setValue({ ...initialState });
    }
 
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={2}>
          <Typography variant="h6" gutterBottom className={classes.heading}>
            Inventory GRN
          </Typography>
          <Grid container spacing={3}>
            <Box component="span">
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    disablePast
                    label="Date"
                    format="MM/dd/yyyy"
                    value={value.date}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="docno"
                  label="Document No"
                  name="docno"
                  value={value.docno}
                  onChange={handleChange("docno")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="supplierno"
                  label="Supplier No"
                  name="supplierno"
                  value={value.supplierno}
                  onChange={handleChange("supplierno")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="itemcode"
                  label="Item Code"
                  name="itemcode"
                  value={value.itemcode}
                  onChange={handleChange("itemcode")}
                />
              </Grid>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  id="diliveryperson"
                  label="Delivery person"
                  name="diliveryperson"
                  value={value.diliveryperson}
                  onChange={handleChange("diliveryperson")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  id="cost"
                  label="Cost"
                  name="cost"
                  value={value.cost}
                  onChange={handleChange("cost")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  id="barcode"
                  label="Barcode"
                  name="barcode"
                  value={value.barcode}
                  onChange={handleChange("barcode")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  id="serialno"
                  label="Serial No"
                  name="serialno"
                  value={value.serialno}
                  onChange={handleChange("serialno")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  id="warranty"
                  label="Warranty"
                  name="warranty"
                  value={value.warranty}
                  onChange={handleChange("warranty")}
                />
              </Grid>
            </Grid>
            <Grid item xs={3} spacing={1}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={addData}
              >
                Add
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
          <Grid>
            <MUIDataTable
            
              title={"Search Items"}
              data={tableData}
              columns={header}
              options={options}
            />
          </Grid>
          <Box className={classes.btn}>
            <Button
              className={classes.buttonSave}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Box>
        </Paper>
      </main>
    </React.Fragment>
  );
}
