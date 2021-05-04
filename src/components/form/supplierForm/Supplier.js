import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { PORT, URL } from "../../../connection/defaultconfig";
import { axios } from "../../../connection/axios";
import { USERID } from "../../../service/userDetails";
import Date from "../../utils/Date";
import {
  Paper,
  Box,
  Button,
  FormControl,
  Snackbar,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
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
  // wrapper: {
  //   margin: theme.spacing(1),
  //   position: "relative",
  // },
  // buttonProgress: {
  //   position: "absolute",
  //   top: "70%",
  //   left: "45%",
  //   marginTop: -12,
  //   marginLeft: -12,
  // },
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

export default function Supplier() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [sup_update, setUpdate] = useState(false);
  const [supname_disable, setSupname_disable] = useState(false);
  const [fields_disable, setFields_disable] = useState(true);
  const [severity, setSeverity] = useState("warning");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({
    suppname: false,
    NIC: false,
    telephone: false,
  });
  const [dirty] = useState({
    suppname: "Supplier name must be more than 3 character",
    NIC: "Invalid NIC Number",
    telephone: "Invalid Telephone No",
  });

  const initialState = {
    id: "",
    suppname: "",
    NIC: "",
    suppadd: "",
    telephone: "",
    remark: "",
    status: "active",
  };

  const [value, setValue] = useState({
    id: "",
    suppname: "",
    NIC: "",
    suppadd: "",
    telephone: "",
    remark: "",
    status: "active",
  });

  const handleSnackBarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //update change and check for validation
  const handleChange = (props) => (event) => {
    if (props === "suppname") {
      if (
        /^([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-]+)+([A-Za-z][A-Za-z'-]+)*/.test(
          event.target.value
        )
      ) {
        setError({ ...error, [props]: false });
        setValue({ ...value, [props]: event.target.value });
      } else {
        setError({ ...error, [props]: true });
        setValue({ ...value, [props]: event.target.value });
      }
    }
    // else if (props === "NIC") {
    //   if (/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/.test(event.target.value)) {
    //     setError({ ...error, [props]: false });
    //     setValue({ ...value, [props]: event.target.value });
    //   } else {
    //     setError({ ...error, [props]: true });
    //     setValue({ ...value, [props]: event.target.value });
    //   }
    // }
    else if (props === "telephone") {
      if (/^([0])+[1-9]\d{8}$/.test(event.target.value)) {
        setError({ ...error, [props]: false });
        setValue({ ...value, [props]: event.target.value });
      } else {
        setError({ ...error, [props]: true });
        setValue({ ...value, [props]: event.target.value });
      }
    } else {
      setValue({ ...value, [props]: event.target.value });
    }

    // setValue({ ...value, [props]: event.target.value });
  };

  const handleClear = () => {
    setValue({ ...initialState });
    setSupname_disable(false);
    setFields_disable(true);
    setUpdate(false);
  };

  const pushData = async () => {
    axios
      .post(`http://${URL}:${PORT}/supplier/createnewsupplier`, {
        name: value.suppname,
        address: value.suppadd,
        nic: value.NIC,
        tel: value.telephone,
        status: value.status,
        remark: value.remark,
        mod_by: "",
        mod_date: "1000-01-01",
        cre_by: USERID,
        cre_date: Date(),
      })
      .then(
        (response) => {
          console.log(response);
          setMessage("Supplier Successfully created");
          setSeverity("success");
          setOpen(true);
          handleClear();
        },
        (error) => {
          setMessage("Unxepected Error");
          setSeverity("error");
          setOpen(true);
          handleClear();
          console.log(error);
        }
      );
  };

  const updateData = async () => {
    axios
      .post(`http://${URL}:${PORT}/supplier/updateSUpplier`, {
        supplierid: value.id,
        name: value.suppname,
        address: value.suppadd,
        nic: value.NIC,
        tel: value.telephone,
        status: value.status,
        remark: value.remark,
        mod_by: "",
        mod_date: "1000-01-01",
        cre_by: USERID,
        cre_date: Date(),
      })
      .then(
        (response) => {
          console.log(response);
          setMessage("Supplier Successfully Updated");
          setSeverity("success");
          setOpen(true);
          handleClear();
        },
        (error) => {
          setMessage("Unxepected Error");
          setSeverity("error");
          setOpen(true);
          handleClear();
          console.log(error);
        }
      );
  };
  //Fetch supplier if exsist in supplier name field focus lost
  // useEffect(() => {
  //   console.log(fetchData);
  //   setValue({
  //     ...value,
  //     NIC: fetchData.nic,
  //     suppadd: fetchData.address,
  //     telephone: fetchData.tel,
  //     remark: fetchData.remark,
  //     status: fetchData.status,
  //   });
  // }, [fetchData]);

  //To find out given supplier name already exsist
  const getDate = async (name) => {
    axios.get(`http://${URL}:${PORT}/supplier/getsupplier/${name}`).then(
      (response) => {
        if (response.data !== "") {
          console.log(response);
          setUpdate(true);
          setSupname_disable(true);
          setFields_disable(false);
          setMessage("Supplier Already Exsist");
          setSeverity("info");
          setOpen(true);
          setValue({
            ...value,
            id: response.data.supplierid,
            NIC: response.data.nic,
            suppadd: response.data.address,
            telephone: response.data.tel,
            remark: response.data.remark,
            status: response.data.status,
          });
        } else {
          console.log(response.data);
          setFields_disable(false);
          setUpdate(false);
        }
      },
      (error) => {
        setMessage("Unxepected Error");
        setSeverity("error");
        setOpen(true);
        handleClear();
        console.log(error);
      }
    );
  };

  const handleSubmit = () => {
    if (value.suppname.trim() === "") {
      setMessage("Supplier name is Required");
      setOpen(true);
    } else if (error.suppname) {
      setMessage("Supplier name must be more than 3 character");
      setOpen(true);
    } else if (value.NIC.trim() === "") {
      setMessage("Supplier NIC is Required");
      setOpen(true);
    } else if (error.NIC) {
      setMessage("Invalid NIC No");
      setOpen(true);
    } else if (value.telephone.trim() === "") {
      setMessage("Supplier telephone is Required");
      setOpen(true);
    } else if (error.telephone) {
      setMessage("Invalid telephone number");
      setOpen(true);
    } else if (value.suppadd.trim() === "") {
      setMessage("Supplier Address is required");
      setOpen(true);
    } else {
      if (sup_update) {
        updateData();
      } else {
        pushData();
      }
    }
  };

  //To check supplier already exsist
  function checkSupplier(event) {
    const name = event.target.value;

    if (name.trim() !== "") {
      getDate(name);
    }
  }

  return (
    <React.Fragment>
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
            Create Supplier
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                disabled={true}
                label="ID"
                name="ID"
                value={value.id}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                placeholder="Atech Lanka"
                disabled={supname_disable}
                error={error.suppname}
                id="suppname"
                label="Supplier Name"
                name="suppname"
                value={value.suppname}
                onChange={handleChange("suppname")}
                helperText={error.suppname ? dirty.suppname : ""}
                onBlur={checkSupplier}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="suppadd"
                placeholder="Colombo 08"
                label="Supplier Address"
                name="suppadd"
                value={value.suppadd}
                disabled={fields_disable}
                onChange={handleChange("suppadd")}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                error={error.NIC}
                id="NIC"
                label="Business Reg No"
                placeholder="PVS20"
                name="NIC"
                value={value.NIC}
                disabled={fields_disable}
                onChange={handleChange("NIC")}
                helperText={error.NIC ? dirty.NIC : ""}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                placeholder="0115866316"
                error={error.telephone}
                id="standard-basic"
                label="Telephone"
                name="telephone"
                disabled={fields_disable}
                value={value.telephone}
                onChange={handleChange("telephone")}
                helperText={error.telephone ? dirty.telephone : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Remark"
                name="remark"
                disabled={fields_disable}
                value={value.remark}
                onChange={handleChange("remark")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup
                  name="status"
                  value={value.status}
                  onChange={handleChange("status")}
                >
                  <FormControlLabel
                    disabled={fields_disable}
                    value="active"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    disabled={fields_disable}
                    value="inactive"
                    control={<Radio />}
                    label="Inactive"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Box className={classes.btn}>
            {/* <div className={classes.wrapper}> */}
            <Button
              className={classes.buttonSave}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={fields_disable}
            >
              {sup_update === true ? "Update" : "Create"}
            </Button>
            {/* {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )} */}
            {/* </div> */}
            {/* <div className={classes.wrapper}> */}
            <Button
              className={classes.buttonSave}
              variant="contained"
              color="secondary"
              onClick={handleClear}
            >
              Clear
            </Button>
            {/* </div> */}
          </Box>
        </Paper>
      </main>
    </React.Fragment>
  );
}
