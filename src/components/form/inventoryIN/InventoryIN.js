import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { PORT, URL } from "../../../connection/defaultconfig";
import { axios } from "../../../connection/axios";
import { USERID } from "../../../service/userDetails";
import Date from "../../utils/Date";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  buttonProgress: {
    position: "absolute",
    top: "70%",
    left: "45%",
    marginTop: -12,
    marginLeft: -12,
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
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSave: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: "8rem",
  },

  box: {
    width: "57rem",
    height: "5rem",
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
  const [dtl_fld, setDtl_fld] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [severity, setSeverity] = useState("warning");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("item");
  const [itemsPick, setItemsPick] = useState();
  const [locationPick, setlocationPick] = useState();
  const [supplierPick, setSupplierPick] = useState();
  const [tableData, setTableData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveBtnDisb, setSaveBtnDisb] = useState(false);
  const [data, setData] = useState({
    doccode: "GRN",
    locationid: "",
    date: Date(),
    serialno: "",
    status: "NAP",
    dilvryprson: "",
    auth: "",
    itmcode: "",
    barcode: "",
    cost: "",
    supplierid: "",
    warrenty_period: "",
    refno: "",
    mod_by: "",
    mod_date: "1000-01-01",
    cre_by: USERID,
    cre_date: Date(),
  });
  const [value, setValue] = useState({
    docno: "",
    date: Date(),
    itemcode: "",
    supplierno: "",
    serialno: "",
    barcode: "",
    cost: "",
    warranty: "",
    diliveryperson: "",
    reffno: "",
    locationid: "",
  });
  const initialState = {
    docno: "",
    date: Date(),
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
    rowsPerPageOptions: [3],
    rowsPerPage: 3,
  };
  const header = [
    "Location Code",
    "Item Code",
    "Serial No",
    "Barcode",
    "Cost",
    "Warranty Period",
  ];

  const pickList_header = ["ID", "Name"];

  /* pick list data select function*/
  const handleRowClick = (dataIndex) => {
    if (type === "supplier") {
      setValue({ ...value, supplierno: dataIndex[0] });
      setDtl_fld(false);
    } else if (type === "location") {
      setValue({ ...value, locationid: dataIndex[0] });
    } else {
      setValue({ ...value, itemcode: dataIndex[0] });
    }
    pickListClose();
  };

  function setDefault() {
    setValue(initialState);
    setDtl_fld(true);
    setDataList([]);
    setTableData([]);
  }
  /**
   * Get data for picklist
   */
  const getAllSupplierPickListData = () => {
    axios
      .get(`http://${URL}:${PORT}/supplier/getsupplier/status/active`)
      .then((response) => {
        const data = response.data.map((data) => [data.supplierid, data.name]);
        setSupplierPick(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  const getAllItemsPickListData = () => {
    axios
      .get(`http://${URL}:${PORT}/inventory/getitems/status/active`)
      .then((response) => {
        const data = response.data.map((data) => [
          data.itemcode,
          data.itemdesc,
        ]);
        setItemsPick(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  //Get locations
  const getLocations = () => {
    axios
      .get(`http://${URL}:${PORT}/location/get_all_locations`)
      .then((response) => {
        const data = response.data.map((data) => [
          data.locationid,
          data.locationname,
        ]);
        setlocationPick(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  const pushData = async () => {
    if (dataList[0] == null) {
      setOpen(true);
      setMessage("No data to save");
    } else {
      setLoading(true);
      setSaveBtnDisb(true);
      axios
        .post(`http://${URL}:${PORT}/inventory/savesuppliergrn`, dataList)
        .then(
          (response) => {
            console.log(dataList);
            console.log(response);
            if (response.data === "GRN CREATE SUCESSFULL") {
              setSeverity("success");
              setOpen(true);
              setMessage("GRN CREATE SUCESSFULL");
              setDefault();
              setLoading(false);
              setSaveBtnDisb(false);
            } else {
              setSeverity("error");
              setOpen(true);
              setMessage(response.data);
              setDefault();
              setLoading(false);
              setSaveBtnDisb(false);
            }
          },
          (error) => {
            setSeverity("error");
            setOpen(true);
            setMessage("Unexpected Error. Check the console for more details");
            setDefault();
            setLoading(false);
            setSaveBtnDisb(false);
            console.log(error);
          }
        );
    }
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

  /*change picklist based on field type select*/
  function picklistData() {
    if (type === "supplier") {
      return supplierPick;
    } else if (type === "location") {
      return locationPick;
    } else {
      return itemsPick;
    }
  }

  // while data update in fileds this methods collect data to post( use to eliminate side effect in use state)
  useEffect(() => {
    setData({
      ...data,
      doccode: "GRN",
      locationid: value.locationid,
      date: Date(),
      serialno: value.serialno,
      status: "NAP",
      dilvryprson: value.diliveryperson,
      auth: "",
      itmcode: value.itemcode,
      barcode: value.barcode,
      cost: value.cost,
      supplierid: value.supplierno,
      warrenty_period: value.warranty,
      refno: value.reffno,
      mod_by: "",
      mod_date: "1000-01-01",
      cre_by: USERID,
      cre_date: Date(),
    });
  }, [value]);

  // Picklist call
  useEffect(() => {
    getAllSupplierPickListData();
    getAllItemsPickListData();
    getLocations();
  }, []);

  function requiredFeilds() {
    if (value.itemcode === "") {
      setSeverity("warning");
      setOpen(true);
      setMessage("Item Code is Required");
    } else if (value.supplierno === "") {
      setSeverity("warning");
      setOpen(true);
      setMessage("Supplier No is Required");
    } else if (value.date === "") {
      setSeverity("warning");
      setOpen(true);
      setMessage("Valid date is Required");
    } else if (value.cost.trim() === "") {
      setSeverity("warning");
      setOpen(true);
      setMessage("Cost is Required");
    } else if (value.serialno.trim() === "") {
      setSeverity("warning");
      setOpen(true);
      setMessage("Serial No is Required");
    } else if (value.locationid === "") {
      setSeverity("warning");
      setOpen(true);
      setMessage("Location is Required");
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

  // const handleClear = () => {
  //   setValue({ ...initialState });
  // };

  const addData = () => {
    if (requiredFeilds()) {
      tableData.push([
        value.locationid,
        value.itemcode,
        value.serialno,
        value.barcode,
        value.cost,
        value.warranty,
      ]);
      //final data set for POST
      //push data for the array

      dataList.push(data);
      setValue({
        ...value,
        itemcode: "",
        locationid: "",
        serialno: "",
        barcode: "",
        cost: "",
        warranty: "",
      });

      console.log(data);
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
        autoHideDuration={4000}
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
          <Box border={1} className={classes.box}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  type="date"
                  label="Date"
                  disabled={true}
                  defaultValue={Date()}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
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
            </Grid>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={3}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">
                  Item Code
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  value={value.itemcode}
                  disabled={dtl_fld}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disabled={dtl_fld}
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
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">
                  Location
                </InputLabel>
                <Input
                  id="locationid"
                  value={value.locationid}
                  disabled={dtl_fld}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disabled={dtl_fld}
                        aria-label="toggle password visibility"
                        onClick={() => {
                          pickListOpen("location");
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
                disabled={dtl_fld}
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
                disabled={dtl_fld}
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
                disabled={dtl_fld}
                name="barcode"
                value={value.barcode}
                onChange={handleChange("barcode")}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                fullWidth
                id="warranty"
                disabled={dtl_fld}
                label="Warranty (Months)"
                name="warranty"
                value={value.warranty}
                onChange={handleChange("warranty")}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={addData}
              >
                Add
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
            <div className={classes.wrapper}>
              <Button
                className={classes.buttonSave}
                variant="contained"
                color="primary"
                onClick={pushData}
                disabled={saveBtnDisb}
              >
                Save
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
            <div className={classes.wrapper}>
              <Button
                className={classes.buttonSave}
                variant="contained"
                color="secondary"
                onClick={() => {
                  setDefault();
                }}
              >
                Clear
              </Button>
            </div>
          </Box>
        </Paper>
      </main>
    </React.Fragment>
  );
}
