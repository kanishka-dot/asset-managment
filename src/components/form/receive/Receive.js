import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  Paper,
  Box,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Modal,
  Snackbar,
} from "@material-ui/core";
import CurrentDate from "../../utils/Date";
import MUIDataTable from "mui-datatables";
import clsx from "clsx";
import AddIcon from "@material-ui/icons/Add";
import { Alert } from "@material-ui/lab";

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
  paper_modal: {
    position: "absolute",
    width: 500,
    backgroundColor: "white",
    padding: theme.spacing(2, 4, 3),
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    marginBottom: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(0),
  },
  textField: {
    width: "25ch",
  },
}));

export default function InventoryIN() {
  const classes = useStyles();
  const responsive = "vertical";
  const tableBodyHeight = "100%";
  const tableBodyMaxHeight = "";
  const [open, setOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [severity, setSeverity] = useState("warning");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("supplier");
  const [tableData] = useState([]);
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
    reffno: "",
  };

  const [value, setValue] = useState({
    docno: "",
    date: CurrentDate(),
    itemcode: "",
    supplierno: "",
    serialno: "",
    barcode: "",
    cost: "",
    warranty: "",
    diliveryperson: "",
    reffno: "",
  });

  const options = {
    elevation: 1,
    filter: false,
    print: false,
    download: false,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onRowsDelete: false,
    selectableRows: "single",
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

  const pickList_header = ["ID", "Name"];

  /* pick list data select function*/
  const handleRowClick = (dataIndex) => {
    if (type === "supplier") {
      setValue({ ...value, supplierno: dataIndex[0] });
    } else {
      setValue({ ...value, itemcode: dataIndex[0] });
    }

    pickListClose();
    console.log(dataIndex[0]);
  };

  const picklist_options = {
    elevation: 1,
    viewColumns: false,
    filter: false,
    print: false,
    download: false,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onRowsDelete: false,
    selectableRows: "none",
    onRowClick: handleRowClick,
  };

  const supplier_date = [
    ["25425", "kamal tenakaon"],
    ["47200", "sadun nimalarathna"],
    ["69685", "Gunasearka perera"],
    ["95671", "malkanthi nona"],
    ["24872", "atek lanka"],
  ];

  const itemcode_date = [
    ["IT205", "Pos Machine"],
    ["PS2546", "Power Supply"],
    ["POS205", "Point of sale machine 01"],
    ["PC5458", "Executive PC"],
    ["PRN5254", "printer laserjet"],
  ];

  /*change picklist based on field type select*/
  function picklistData() {
    if (type === "supplier") {
      return supplier_date;
    } else {
      return itemcode_date;
    }
  }

  function requiredFeilds() {
    if (value.itemcode.trim() === "") {
      setOpen(true);
      setMessage("Item Code is Required");
    } else if (value.supplierno.trim() === "") {
      setOpen(true);
      setMessage("Supplier No is Required");
    } else if (value.date.trim() === "") {
      setOpen(true);
      setMessage("Valid date is Required");
    } else if (value.cost.trim() === "") {
      setOpen(true);
      setMessage("Cost is Required");
    } else if (value.serialno.trim() === "") {
      setOpen(true);
      setMessage("Serial No is Required");
    } else {
      return true;
    }
  }

  const pickListOpen = (type) => {
    setType(type);
    setModalOpen(true);
  };

  const pickListClose = () => {
    setModalOpen(false);
  };

  const handleSnackBarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (props) => (event) => {
    if (props === "cost") {
      if (/^[0-9]*$/.test(event.target.value)) {
        setValue({ ...value, [props]: event.target.value });
      }
    } else {
      setValue({ ...value, [props]: event.target.value });
    }

    // setValue({ ...value, [props]: event.target.value });
  };

  function handleDateChange(event) {
    setValue({ ...value, date: event.target.value });
    console.log(event.persist);
  }

  const handleClear = () => {
    setValue({ ...initialState });
  };

  const addData = () => {
    if (requiredFeilds()) {
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
    }
  };

  const body = (
    <div className={classes.paper_modal}>
      <MUIDataTable
        title={"Pick List"}
        data={picklistData()}
        columns={pickList_header}
        options={picklist_options}
      />
    </div>
  );

  return (
    <React.Fragment>
      <Modal className={classes.modal} open={ModalOpen} onClose={pickListClose}>
        {body}
      </Modal>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        onClose={handleSnackBarClose}
        autoHideDuration={2000}
      >
        <Alert onClose={handleSnackBarClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>

      {/* </Snackbar> */}
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
                <InputLabel htmlFor="standard-adornment-password">
                  Supplier No
                </InputLabel>
                <Input
                  name="supplier"
                  value={value.supplierno}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        // aria-label="toggle password visibility"
                        onClick={() => {
                          pickListOpen("supplier");
                        }}
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
                <InputLabel htmlFor="standard-adornment-password">
                  Item Code
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  value={value.itemcode}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          pickListOpen("item");
                        }}
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
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                id="cost"
                label="Cost(Rs.)"
                name="cost"
                value={value.cost}
                onChange={handleChange("cost")}
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
                id="warranty"
                label="Warranty (Months)"
                name="warranty"
                value={value.warranty}
                onChange={handleChange("warranty")}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                fullWidth
                id="refno"
                label="Refferance No"
                name="reffno"
                value={value.reffno}
                onChange={handleChange("reffno")}
              />
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
