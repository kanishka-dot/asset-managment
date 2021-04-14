import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { axios } from "../../../connection/axios";
import { Button, Grid, TextField } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { PORT, URL } from "../../../connection/defaultconfig";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "50rem",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "50rem",
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },

  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: 100,
  },
  btn: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const steps = ["User Details", "Summary"];

export default function Location() {
  const classes = useStyles();
  const locationRef = useRef(null);
  const createBtnRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");

  const FormClear = {
    location: "",
    locname: "",
  };

  const [values, setValues] = useState({
    location: "",
    locname: "",
  });

  const popNotify = (result) => {
    if (result === 1) {
      setSeverity("success");
      setMessage("Item Group Sucessfully Created.");
      setOpen(true);
    } else if (result === 0) {
      setSeverity("error");
      setMessage("Item Group Already Exsist.");
      setOpen(true);
    }
  };

  const clearData = () => {
    setValues(FormClear);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    setValues({ ...values, [nam]: val });
  };

  const changeFocus = (event) => {
    if (event.target.name === "location") {
      if (event.key === "Enter") {
        locationRef.current.focus();
      }
    } else {
      if (event.key === "Enter") {
        createBtnRef.current.focus();
      }
    }
  };

  const createLocationCode = () => {
    const fetchData = async () => {
      axios
        .post(`http://${URL}:${PORT}/location/createnewlocation`, {
          locationid: values.location,
          locationname: values.locname,
          mod_by: "kanishka",
          mod_date: "2021-03-07",
          cre_by: "kanishka",
          cre_date: "2021-03-07",
        })
        .then(
          (response) => {
            if (response.data === 1) {
              popNotify(1);
              clearData();
            } else if (response.data === 0) {
              popNotify(0);
              clearData();
            }
          },
          (error) => {
            console.log(error);
            setSeverity("error");
            setMessage("Unexpected Error");
            setOpen(true);
          }
        );
    };

    if (values.location.trim() === "") {
      console.log("location Code -->", values.location);
      console.log("location Name -->", values.locname);
      setSeverity("error");
      setMessage("Pleses provide details. Location Field can't be blank");
      setOpen(true);
    } else if (values.locname.trim() === "") {
      setSeverity("error");
      setMessage("Pleses provide details. Location Name Field can't be blank");
      setOpen(true);
    } else {
      fetchData();
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={2000}
        message={message}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h6" variant="h6" align="left">
            Create Location
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Location"
                name="location"
                value={values.location}
                onChange={handleChange}
                onKeyPress={changeFocus}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Location Name"
                name="locname"
                value={values.locname}
                inputRef={locationRef}
                onChange={handleChange}
                onKeyPress={changeFocus}
              />
            </Grid>
          </Grid>
          <div className={classes.btn}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={createLocationCode}
              innerRef={createBtnRef}
            >
              Create
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
