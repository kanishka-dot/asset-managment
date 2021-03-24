import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Paper, Box, Button, FormControl, InputLabel, Input, InputAdornment, IconButton } from "@material-ui/core";
import CurrentDate from "../../utils/Date";
import MUIDataTable from "mui-datatables";
import clsx from "clsx"
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "60rem",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "60rem",
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
  margin: {
    margin: theme.spacing(0),
  },
  textField: {
    width: '25ch',
  },
}));

export default function InventoryIN() {
  const classes = useStyles();
  const responsive = "vertical";
  const tableBodyHeight = "100%";
  const tableBodyMaxHeight = "";

  const options = {
    elevation: 5,
    filter: false,
    print: false,
    download: false,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onRowsDelete: false,
    selectableRows: false
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

  const top100Films = [
    { name: "Atec pvt ltd", no: 1994 },
    { name: "Dell co", no: 1972 },
    { name: "Mega", no: 1974 },
  ];

  function handleDateChange(event) {
    setValue({ ...value, date: event.target.value });
    console.log(event.persist);
  }

  const handleClear = () => {
    setValue({ ...initialState });
  };

  const addData = () => {
   
      tableData.push([
        value.docno,
        value.date,
        value.itemcode,
        value.supplierno,
        value.serialno,
        value.barcode,
        value.cost,
        value.warranty,
        value.diliveryperson,
      ]);
      setValue({ ...initialState });
   
    console.log(value);
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={2}>
          <Typography variant="h6" gutterBottom className={classes.heading}>
            Inventory GRN
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="date"
                label="Date"
                defaultValue={CurrentDate()}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>


            <Grid item xs={3}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Supplier No</InputLabel>
                <Input
                  id="standard-adornment-password"
                  value={value.supplierno}
                  onChange={handleChange("supplierno")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=>{console.log("click")}
                        }
                      >
                       <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Item Code</InputLabel>
                <Input
                  id="standard-adornment-password"
                  value={value.itemcode}
                  onChange={handleChange("itemcode")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=>{console.log("click")}
                        }
                      >
                       <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

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

            <Grid item xs={12} spacing={1}>
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
