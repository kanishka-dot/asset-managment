import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { PORT, URL } from "../../../connection/defaultconfig";
import { axios } from "../../../connection/axios";
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

export default function Transfer() {
  const classes = useStyles();
  const responsive = "vertical";
  const tableBodyHeight = "100%";
  const tableBodyMaxHeight = "";
  const [open, setOpen] = useState(false);
  const [dtl_fld, setDtl_fld] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [severity, setSeverity] = useState("warning");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("doc");
  const [documents, setDocuments] = useState();
  const [tableData, setTableData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveBtnDisb, setSaveBtnDisb] = useState(false);
  const [data, setData] = useState({
    docno: "",
    app_by: "",
    app_date: "",
    mod_by: "",
    mod_date: "",
  });
  const [value, setValue] = useState({
    docno: "",
  });
  const initialState = {
    docno: "",
    cre_date: CurrentDate(),
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
  const header = ["Serial No", "Item Code", "Remark"];

  const pickList_header = ["Location", "Document No"];

  /* pick list data select function*/
  const handleRowClick = (dataIndex) => {
    if (type === "doc") {
      setValue({ ...value, docno: dataIndex[1] });
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

  const getInvData = () => {
    axios
      .get(`http://${URL}:${PORT}/inventory/receive/${25}`)
      .then((response) => {
        const data = response.data.map((data) => [data[1], data[0]]);
        console.log(data);
        setDocuments(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  const getData = (docno) => {
    axios
      .get(`http://${URL}:${PORT}/inventory/receive/getgtn/${docno}`)
      .then((response) => {
        const data = response.data.map((data) => [
          data.serialno,
          data.itemcode,
          data.remark,
        ]);
        console.log(data);
        setTableData(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  const saveGTN = async () => {
    if (tableData[0] == null) {
      setOpen(true);
      setMessage("No data to save");
    } else {
      console.log(dataList);
      setLoading(true);
      setSaveBtnDisb(true);
      axios
        .post(
          `http://${URL}:${PORT}/inventory/receive/approve/${value.docno}/kamal`
        )
        .then(
          (response) => {
            console.log(dataList);
            console.log(response);
            if (response.data === "GTN Sucessfully Approved") {
              setSeverity("success");
              setOpen(true);
              setMessage("GTN Sucessfully Approved");
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
    if (type === "doc") {
      return documents;
    }
  }

  // while data update in fileds this methods collect data to post( use to eliminate side effect in use state)
  useEffect(() => {
    setData({
      ...data,
      docno: value.docno,
      app_by: "",
      app_date: "",
      mod_by: "",
      mod_date: "",
    });
  }, [value]);

  // Picklist call
  // useEffect(() => {
  //   getLocations();
  //   getLocInventory();
  // }, []);

  function requiredFeilds() {
    if (value.docno === "") {
      setSeverity("warning");
      setOpen(true);
      setMessage("Pick a Document to view");
    } else {
      return true;
    }
  }

  // Picklist call
  useEffect(() => {
    getInvData();
  }, []);

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
    setValue({ ...value, [props]: event.target.value });

    // setValue({ ...value, [props]: event.target.value });
  };

  function handleDateChange(event) {
    setValue({ ...value, cre_date: event.target.value });
    console.log(event.persist);
  }

  // const handleClear = () => {
  //   setValue({ ...initialState });
  // };

  const viewData = () => {
    if (requiredFeilds()) {
      getData(value.docno);
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
            Inventory GTN IN
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="date"
                label="Date"
                disabled={true}
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
                  Document No
                </InputLabel>
                <Input
                  name="docno"
                  value={value.docno}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        // aria-label="toggle password visibility"
                        onClick={() => {
                          pickListOpen("doc");
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={viewData}
              >
                View
              </Button>
            </Grid>
          </Grid>
          <Grid>
            <MUIDataTable
              title={"Details"}
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
                onClick={saveGTN}
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
