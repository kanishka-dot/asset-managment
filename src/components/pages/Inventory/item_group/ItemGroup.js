import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { axios } from "../../../../connection/axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Button, Grid, TextField } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import InputMask from "react-input-mask";
import { PORT, URL } from "../../../../connection/defaultconfig";
import { USERID } from "../../../../service/userDetails";
import Date from "../../../../components/utils/Date";

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
    width: 100,
  },
  btn: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
export default function ItemGroup() {
  const classes = useStyles();
  const itmgrpRef = useRef(null);
  const depriciationRef = useRef(null);
  const createBtnRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");

  const FormClear = {
    Itmgrp: "",
    ItmGrpNm: "",
    depriciation: "",
  };

  const [values, setValues] = useState({
    Itmgrp: "",
    ItmGrpNm: "",
    depriciation: "",
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
    } else {
      setSeverity("error");
      setMessage("Connection Error. Please check the connection.");
      setOpen(true);
    }
  };

  const clearData = () => {
    setValues(FormClear);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createItemGroup = () => {
    const pushData = async () => {
      axios
        .post(`http://${URL}:${PORT}/itemgroup/createnewitemgroup`, {
          id: values.Itmgrp,
          name: values.ItmGrpNm,
          depriciation: values.depriciation,
          mod_by: "",
          mod_date: "1000-01-01",
          cre_by: USERID,
          cre_date: Date(),
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
            popNotify(3);
            clearData();
            console.log(error);
          }
        );
    };

    if (values.Itmgrp.trim() === "") {
      console.log("Item group -->", values.Itmgrp);
      setSeverity("error");
      setMessage("Pleses provide details. Item Group Field can't be blank");
      setOpen(true);
    } else if (values.ItmGrpNm.trim() === "") {
      setSeverity("error");
      setMessage(
        "Pleses provide details. Item Group Name Field can't be blank"
      );
      setOpen(true);
      console.log("Item group Name-->", values.ItmGrpNm);
    } else if (values.depriciation.trim() === "") {
      setSeverity("error");
      setMessage("Pleses provide details. Depriciation Field can't be blank");
      setOpen(true);
      console.log("Item group Dep-->", values.depriciation);
    } else {
      console.log("Item group -->", values.Itmgrp);
      console.log("Item group Name -->", values.ItmGrpNm);
      console.log("Item group Dep-->", values.depriciation);
      pushData();
    }
  };

  const handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    setValues({ ...values, [nam]: val });
  };

  const changeFocus = (event) => {
    if (event.target.name === "Itmgrp") {
      if (event.key === "Enter") {
        itmgrpRef.current.focus();
      }
    } else if (event.target.name === "ItmGrpNm") {
      if (event.key === "Enter") {
        depriciationRef.current.focus();
      }
    } else {
      if (event.key === "Enter") {
        createBtnRef.current.focus();
      }
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
        onClose={handleClose}
        message={message}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h6" variant="h6" align="left">
            Create Item Group
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="Itmgrp"
                label="Item Group"
                value={values.Itmgrp}
                name="Itmgrp"
                onChange={handleChange}
                onKeyPress={changeFocus}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="ItmGrpNm"
                label="Item Group Name"
                name="ItmGrpNm"
                inputRef={itmgrpRef}
                onChange={handleChange}
                value={values.ItmGrpNm}
                onKeyPress={changeFocus}
              />
            </Grid>
            <Grid item xs={3}>
              <InputMask
                mask="99"
                disabled={false}
                maskChar=""
                onChange={handleChange}
                value={values.depriciation}
              >
                {() => (
                  <TextField
                    id="depriciation"
                    label="Depriciation Rate"
                    name="depriciation"
                    inputRef={depriciationRef}
                    onKeyPress={changeFocus}
                  />
                )}
              </InputMask>
            </Grid>
          </Grid>
          <div className={classes.btn}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              innerRef={createBtnRef}
              onClick={createItemGroup}
            >
              Create
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
