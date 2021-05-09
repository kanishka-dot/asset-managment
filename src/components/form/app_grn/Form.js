import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { PORT, URL } from "../../../connection/defaultconfig";
import { axios } from "../../../connection/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { USERID } from "../../../service/userDetails";
import {
  Paper,
  Box,
  Button,
  FormControl,
  InputLabel,
  Input,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import CurrentDate from "../../utils/Date";
import MUIDataTable from "mui-datatables";
import clsx from "clsx";
import AddIcon from "@material-ui/icons/Add";
import { Alert } from "@material-ui/lab";
import { Modal } from "@material-ui/core";

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
  buttonProgress: {
    position: "absolute",
    top: "70%",
    left: "45%",
    marginTop: -12,
    marginLeft: -12,
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
  const [documents, setDocuments] = useState();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveBtnDisb, setSaveBtnDisb] = useState(false);

  /* pick list data select function*/
  const handleRowClick = (dataIndex) => {
    if (type === "doc") {
      setValue({ ...value, docno: dataIndex[1] });
    }
    pickListClose();
  };

  const [value, setValue] = useState({
    docno: "",
  });

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

  const options = {
    elevation: 1,
    filter: false,
    print: false,
    download: false,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onRowsDelete: true,
    selectableRows: "multiple",
    rowsPerPage: 2,
    rowsPerPageOptions: [2],
    viewColumns: false,
  };
  const header = [
    "Item Serial",
    "Item Code",
    "Cost",
    "Supplier ID",
    "Warrenty Period",
  ];
  function setDefault() {
    setTableData([]);
    setValue({ ...value, docno: "" });
  }

  const pickList_header = ["Location", "Document No", "Refferance No"];

  function requiredFeilds() {
    if (value.docno === "") {
      setSeverity("warning");
      setOpen(true);
      setMessage("Pick a Document to view");
    } else {
      return true;
    }
  }
  const saveGRN = async () => {
    if (tableData[0] == null) {
      setOpen(true);
      setMessage("No data to save");
    } else {
      setLoading(true);
      setSaveBtnDisb(true);
      axios
        .post(
          `http://${URL}:${PORT}/inventory/grn/approvegrn/${value.docno}/${USERID}`
        )
        .then(
          (response) => {
            console.log(response);
            if (response.data[0] === "1") {
              setSeverity("success");
              setOpen(true);
              setMessage(response.data[1]);
              setDefault();
              setLoading(false);
              setSaveBtnDisb(false);
              getGrnData();
            } else {
              setSeverity("error");
              setOpen(true);
              setMessage(response.data[1]);
              setDefault();
              setLoading(false);
              setSaveBtnDisb(false);
              getGrnData();
            }
          },
          (error) => {
            setSeverity("error");
            setOpen(true);
            setMessage("Unexpected Error. Check the console for more details");
            setDefault();
            setLoading(false);
            setSaveBtnDisb(false);
            getGrnData();
            console.log(error);
          }
        );
    }
  };

  const getData = (docno) => {
    axios
      .get(`http://${URL}:${PORT}/inventory/grn/${docno}`)
      .then((response) => {
        console.log(response);
        const data = response.data.map((data) => [
          data.serialno,
          data.itmcode,
          data.cost,
          data.supplierid,
          data.warrenty_period,
        ]);
        console.log(data);
        setTableData(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  function picklistData() {
    if (type === "doc") {
      return documents;
    }
  }

  const viewData = () => {
    if (requiredFeilds()) {
      getData(value.docno);
    }
  };

  const getGrnData = () => {
    axios
      .get(`http://${URL}:${PORT}/inventory/grn/getstatusnap`)
      .then((response) => {
        const data = response.data.map((data) => [
          data.grnPK.locationid,
          data.grnPK.docno,
          data.refno,
        ]);
        setDocuments(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

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
  // Picklist call
  useEffect(() => {
    getGrnData();
  }, []);

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
            Inventory GRN Approvel
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
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

            <Box className={classes.btn}>
              <Button
                className={classes.buttonSave}
                variant="contained"
                color="primary"
                onClick={viewData}
              >
                View
              </Button>
            </Box>

            <Grid item xs={12}>
              <MUIDataTable
                title={"Filter GRN"}
                columns={header}
                options={options}
                data={tableData}
              />
            </Grid>
          </Grid>

          <Box className={classes.btn}>
            <div className={classes.wrapper}>
              <Button
                className={classes.buttonSave}
                variant="contained"
                color="primary"
                onClick={saveGRN}
                disabled={saveBtnDisb}
              >
                Approve
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Box>
        </Paper>
      </main>
    </React.Fragment>
  );
}
