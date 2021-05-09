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
  const [dtl_fld, setDtl_fld] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [severity, setSeverity] = useState("warning");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("item");
  const [itemsPick, setItemsPick] = useState();
  const [tableData, setTableData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [saveBtnDisb, setSaveBtnDisb] = useState(false);
  const [data, setData] = useState({
    mroPK: {
      docno: "",
      doccode: "MROOUT",
      seqno: "",
      item_code: "",
    },
    date: Date(),
    serialno: "",
    qty: 0,
    cost: 0,
    tot_cost: 0,
    supplier: "",
    remark: "",
    mod_by: "",
    mod_date: "1000-01-01",
    cre_by: USERID,
    cre_date: Date(),
  });
  const [value, setValue] = useState({
    docno: "",
    date: Date(),
    item_code: "",
    supplierno: "",
    cost: "",
    balance: "",
    qty: "",
    tot_cost: "",
    diliveryperson: "",
    remark: "",
    locationid: "",
  });
  const initialState = {
    item_code: "",
    qty: "",
    remark: "",
    balance: "",
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
    rowsPerPageOptions: [3],
    rowsPerPage: 3,
    selectableRows: "none",
  };
  const header = ["Item Code", "Issue Qty", "Remark"];

  const pickList_header = ["ID", "Name"];

  /* pick list data select function*/
  const handleRowClick = (dataIndex) => {
    if (type === "item") {
      setValue({ ...value, item_code: dataIndex[0] });
    }
    pickListClose();
  };

  function setDefault() {
    setValue(initialState);
    setDataList([]);
    setTableData([]);
  }
  /**
   * Get data for picklist
   */

  const getAllItemsPickListData = () => {
    axios
      .get(`http://${URL}:${PORT}/inventory/getitems/status/active/MRO`)
      .then((response) => {
        const data = response.data.map((data) => [
          data.itemcode,
          data.itemdesc,
        ]);
        setItemsPick(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  const getBalanceQty = () => {
    axios
      .get(
        `http://${URL}:${PORT}/inventory/mro_supplies/balQty/${value.item_code}`
      )
      .then((response) => {
        setValue({ ...value, balance: response.data });
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
      console.log(dataList);
      axios
        .post(
          `http://${URL}:${PORT}/inventory/mro_supplies/save/mroOUT`,
          dataList
        )
        .then(
          (response) => {
            console.log(dataList);
            console.log(response);
            if (response.data[0] === "1") {
              setSeverity("success");
              setOpen(true);
              setMessage(response.data[1]);
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
    if (type === "item") {
      return itemsPick;
    }
  }

  // while data update in fileds this methods collect data to post( use to eliminate side effect in use state)
  useEffect(() => {
    setData({
      ...data,
      mroPK: {
        docno: "",
        doccode: "MROOUT",
        seqno: "",
        item_code: value.item_code,
      },
      qty: value.qty,
      cost: "",
      tot_cost: "",
      supplier: "",
      remark: value.remark,
      mod_by: "",
      mod_date: "1000-01-01",
      cre_by: USERID,
      cre_date: Date(),
    });
  }, [value]);

  // Picklist call
  useEffect(() => {
    getAllItemsPickListData();
  }, []);

  useEffect(() => {
    getBalanceQty();
  }, [value.item_code]);

  function requiredFeilds() {
    if (value.itemcode === "") {
      setSeverity("warning");
      setOpen(true);
      setMessage("Item Code is Required");
    } else if (value.qty.trim() === "") {
      setSeverity("warning");
      setOpen(true);
      setMessage("Qty is Required");
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
    if (props === "qty") {
      if (/^[0-9]*$/.test(event.target.value)) {
        setValue({ ...value, [props]: event.target.value });
      }
    } else {
      setValue({ ...value, [props]: event.target.value });
    }

    // setValue({ ...value, [props]: event.target.value });
  };

  // Picklist call
  useEffect(() => {
    if (value.qty > value.balance) {
      setError(true);
    } else {
      setError(false);
    }
  }, [value.qty]);

  function handleDateChange(event) {
    setValue({ ...value, date: event.target.value });
    console.log(event.persist);
  }

  // const handleClear = () => {
  //   setValue({ ...initialState });
  // };

  const addData = () => {
    if (requiredFeilds()) {
      tableData.push([value.item_code, value.qty, value.remark]);
      //final data set for POST
      //push data for the array

      dataList.push(data);
      setValue({
        ...value,
        item_code: "",
        remark: "",
        qty: "",
        balance: "",
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
            MRO Dispatch
          </Typography>

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
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={3}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">
                  Item Code
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  value={value.item_code}
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
                id="balance"
                disabled={true}
                label="Balance Qty"
                name="balance"
                value={value.balance}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                error={error}
                helperText={error ? "Issue Qty Greater than balance Qty" : ""}
                id="qty"
                disabled={dtl_fld}
                label="Issue Qty"
                name="qty"
                value={value.qty}
                onChange={handleChange("qty")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="remark"
                label="Remark"
                name="remark"
                value={value.remark}
                onChange={handleChange("remark")}
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
