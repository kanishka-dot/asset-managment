import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { PORT, URL } from "../../../connection/defaultconfig";
import { axios } from "../../../connection/axios";
import { USERID } from "../../../service/userDetails";
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
import { Checkbox } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

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
    width: "14rem",
  },
  buttonProgress: {
    position: "absolute",
    top: "70%",
    left: "45%",
    marginTop: -12,
    marginLeft: -12,
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
  txtTopPad: {
    paddingTop: "0.5rem",
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
    paddingTop: "1rem",
  },
  margin: {
    margin: theme.spacing(0),
  },
  textField: {
    width: "27ch",
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
  const [documents, setDocuments] = useState();
  const [items, setItems] = useState();
  const [checked, setChecked] = useState(false);
  const [mroIn, setMroIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saveBtnDisb, setSaveBtnDisb] = useState(false);
  const [mroList, setMroList] = useState({
    mroItem: "",
    qty: "",
  });
  const [type, setType] = useState("supplier");
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState({
    docno: "",
    userId: USERID,
    postDetCase: "",
    mroItems: [],
  });
  const initialState = {
    mroItem: "",
    qty: "",
  };

  const dataIniStat = {
    docno: "",
    userId: "",
    postDetCase: "",
    mroItems: [],
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
    selectableRows: "none",
    rowsPerPageOptions: [2],
    rowsPerPage: 2,
    viewColumns: false,
    search: false,
  };

  const header = ["Item Code", "Qty"];

  const itempickList = ["Item Code", "Name"];

  const docPickList = [
    "Document No",
    "Serial No",
    "Item Code",
    "Pre determine Case",
  ];

  const getPickHeader = () => {
    if (type === "docno") {
      return docPickList;
    } else {
      return itempickList;
    }
  };

  /* pick list data select function*/
  const handleRowClick = (dataIndex) => {
    if (type === "docno") {
      setData({ ...data, docno: dataIndex[0] });
    } else {
      setMroList({ ...mroList, mroItem: dataIndex[0] });
    }

    pickListClose();
    console.log(dataIndex[0]);
  };

  const handleChxChange = (event) => {
    setChecked(event.target.checked);
  };

  const getAllItemsPickListData = () => {
    axios
      .get(`http://${URL}:${PORT}/inventory/getitems/status/active/MRO`)
      .then((response) => {
        const data = response.data.map((data) => [
          data.itemcode,
          data.itemdesc,
        ]);
        setItems(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  const getAllRepItems = () => {
    axios
      .get(`http://${URL}:${PORT}/inventory/repair/inrepair`)
      .then((response) => {
        console.log(response);
        const data = response.data.map((data) => [
          data.repairPK.docno,
          data.repairPK.serialno,
          data.itemcode,
          data.pre_det_caus,
        ]);
        setDocuments(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  function isDocnoSet() {
    if (data.docno === "") {
      setOpen(true);
      setMessage("No Document selected to save");
    } else {
      return true;
    }
  }

  const handleSave = () => {
    if (isDocnoSet()) {
      setLoading(true);
      setSaveBtnDisb(true);
      axios.post(`http://${URL}:${PORT}/inventory/repair/complete`, data).then(
        (response) => {
          console.log(data);
          console.log(response);
          if (response.data[0] === "1") {
            setSeverity("success");
            setOpen(true);
            setMessage(response.data[1]);
            handleClear();
            setLoading(false);
            setSaveBtnDisb(false);
            getAllRepItems();
          } else {
            setSeverity("error");
            setOpen(true);
            setMessage(response.data);
            handleClear();
            setLoading(false);
            setSaveBtnDisb(false);
            getAllRepItems();
          }
        },
        (error) => {
          setSeverity("error");
          setOpen(true);
          setMessage("Unexpected Error. Check the console for more details");
          handleClear();
          setLoading(false);
          setSaveBtnDisb(false);
          getAllRepItems();
          console.log(error);
        }
      );
    }
  };
  useEffect(() => {
    getAllItemsPickListData();
    getAllRepItems();
  }, []);

  const picklist_options = {
    elevation: 0,
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
    if (type === "docno") {
      return documents;
    } else {
      return items;
    }
  }

  function requiredFeilds() {
    if (mroList.mroItem === "") {
      setOpen(true);
      setMessage("Item Code is Required");
    } else if (mroList.qty.trim === "") {
      setOpen(true);
      setMessage("Qty is Required");
    } else {
      return true;
    }
  }

  useEffect(() => {
    if (checked) {
      setMroIn(false);
    } else {
      setMroIn(true);
    }
  }, [checked]);

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
    setData({ ...data, [props]: event.target.value });
  };
  const handleMroChange = (props) => (event) => {
    if (/^[0-9]*$/.test(event.target.value)) {
      setMroList({ ...mroList, [props]: event.target.value });
    }
  };

  // setValue({ ...value, [props]: event.target.value });

  //   function handleDateChange(event) {
  //     setValue({ ...value, date: event.target.value });
  //     console.log(event.persist);
  //   }

  const handleClear = () => {
    setData({
      ...data,
      docno: "",
      userId: "",
      postDetCase: "",
      mroItems: [],
    });
    setMroList({ ...mroList, mroItem: "", qty: "" });
    setTableData([]);
    setChecked(false);
  };

  const addData = () => {
    if (requiredFeilds()) {
      tableData.push([mroList.mroItem, mroList.qty]);

      data.mroItems.push(mroList);
      setMroList({ ...initialState });

      console.log(value);
    }
  };

  const body = (
    <div className={classes.paper_modal}>
      <MUIDataTable
        title={"Pick List"}
        data={picklistData()}
        columns={getPickHeader()}
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
            Complete Repair Items
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="date"
                label="Date"
                disabled={true}
                defaultValue={CurrentDate()}
                // onChange={handleDateChange}
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
                  value={data.docno}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        // aria-label="toggle password visibility"
                        onClick={() => {
                          pickListOpen("docno");
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                multiline
                id="postDetCase"
                label="Post Identify Case"
                name="postDetCase"
                value={data.postDetCase}
                onChange={handleChange("postDetCase")}
              />
            </Grid>
          </Grid>
          <hr></hr>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.heading}
          >
            MRO Items Included
          </Typography>
          <Checkbox
            checked={checked}
            onChange={handleChxChange}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Grid item xs={3}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Item Code
                  </InputLabel>
                  <Input
                    disabled={mroIn}
                    id="standard-adornment-password"
                    value={mroList.mroItem}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          disabled={mroIn}
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

              <Grid item xs={12}>
                <TextField
                  className={classes.txtTopPad}
                  disabled={mroIn}
                  fullWidth
                  multiline
                  id="isqty"
                  label="Issue Qty"
                  name="qty"
                  value={mroList.qty}
                  onChange={handleMroChange("qty")}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  disabled={mroIn}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={addData}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <MUIDataTable
                data={tableData}
                columns={header}
                options={options}
              />
            </Grid>
          </Grid>

          <Box className={classes.btn}>
            <div className={classes.wrapper}>
              <Button
                className={classes.buttonSave}
                variant="contained"
                color="primary"
                onClick={handleSave}
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
                onClick={handleClear}
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
