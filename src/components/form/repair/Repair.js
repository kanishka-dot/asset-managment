import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Paper, Box, Button, Modal, Snackbar } from "@material-ui/core";
import CurrentDate from "../../utils/Date";
import MUIDataTable from "mui-datatables";
import { PORT, URL } from "../../../connection/defaultconfig";
import { axios } from "../../../connection/axios";
import Date from "../../utils/Date";
import { USERID, LOCATIONID } from "../../../service/userDetails";
import { Alert } from "@material-ui/lab";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
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

export default function Repair() {
  const classes = useStyles();
  const responsive = "vertical";
  const tableBodyHeight = "100%";
  const tableBodyMaxHeight = "";
  const [open, setOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [severity, setSeverity] = useState("warning");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("supplier");
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState();
  const [saveBtnDisb, setSaveBtnDisb] = useState(false);
  const [data, setData] = useState({
    repairPK: {
      docno: "",
      doccode: "",
      serialno: "",
    },
    itemcode: "",
    pre_det_caus: "",
    post_det_caus: "",
    src_doccode: "",
    src_docno: "",
    status: "INREP",
    mod_by: "",
    mod_date: "1000-01-01",
    cre_by: USERID,
    cre_date: Date(),
  });
  const initialState = {
    serialno: "",
    itemcode: "",
    pre_det_caus: "",
  };

  const [value, setValue] = useState({
    serialno: "",
    itemcode: "",
    pre_det_caus: "",
  });

  const pickList_header = ["ID", "Name"];

  /* pick list data select function*/
  const handleRowClick = (dataIndex) => {
    if (type === "serialno") {
      setValue({ ...value, serialno: dataIndex[0], itemcode: dataIndex[1] });
      // setValue({ ...value,  });
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

  useEffect(() => {
    setData({
      ...data,
      repairPK: {
        docno: "",
        doccode: "INREP",
        serialno: value.serialno,
      },
      itemcode: value.itemcode,
      pre_det_caus: value.pre_det_caus,
      post_det_caus: "",
      src_doccode: "",
      src_docno: "",
      status: "INREP",
      mod_by: "",
      mod_date: "1000-01-01",
      cre_by: USERID,
      cre_date: Date(),
    });
  }, [value]);

  const getLocInventory = () => {
    axios
      .get(`http://${URL}:${PORT}/inventory/location/${LOCATIONID}/LOC`)
      .then((response) => {
        const data = response.data.map((data) => [
          data.serialno,
          data.itemcode,
        ]);
        setInventory(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  const pushData = async () => {
    if (requiredFeilds()) {
      setLoading(true);
      setSaveBtnDisb(true);
      console.log(data);
      axios
        .post(`http://${URL}:${PORT}/inventory/repair/addRepaiItem`, data)
        .then(
          (response) => {
            console.log(response);
            if (response.data[0] === "1") {
              setSeverity("success");
              setOpen(true);
              setMessage(response.data[1]);
              setValue({ ...initialState });
              setLoading(false);
              setSaveBtnDisb(false);
              getLocInventory(); // fetch once again to update location inventory after success save
            } else {
              setSeverity("error");
              setOpen(true);
              setMessage(response.data[1]);
              setValue({ ...initialState });
              setLoading(false);
              setSaveBtnDisb(false);
              getLocInventory();
            }
          },
          (error) => {
            setSeverity("error");
            setOpen(true);
            setMessage("Unexpected Error. Check the console for more details");

            setLoading(false);
            setSaveBtnDisb(false);
            getLocInventory();
            console.log(error);
          }
        );
    }
  };

  /*change picklist based on field type select*/
  function picklistData() {
    if (type === "serialno") {
      return inventory;
    }
  }

  // Picklist call
  useEffect(() => {
    getLocInventory();
  }, []);

  function requiredFeilds() {
    if (value.serialno === "") {
      setSeverity("warning");
      setMessage("Serial no is Required");
      setOpen(true);
    } else if (value.pre_det_caus === "") {
      setSeverity("warning");
      setMessage("Pre Detrmine Case is Required");
      setOpen(true);
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
    setValue({ ...value, [props]: event.target.value });
  };

  function handleDateChange(event) {
    setValue({ ...value, date: event.target.value });
    console.log(event.persist);
  }

  const handleClear = () => {
    setValue({ ...initialState });
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
            ADD Repair Items
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                disabled
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
                  Serial No
                </InputLabel>
                <Input
                  id="serialno"
                  value={value.serialno}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          pickListOpen("serialno");
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
                disabled
                fullWidth
                id="itemcode"
                label="Item Code"
                name="itemcode"
                value={value.itemcode}
                onChange={handleChange("itemcode")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                multiline
                id="'pre_det_caus'"
                label="Pre Detarmine Case"
                name="remark"
                value={value.pre_det_caus}
                onChange={handleChange("pre_det_caus")}
              />
            </Grid>
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
