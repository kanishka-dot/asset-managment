import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { axios } from "../../../../connection/axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Button, Grid, TextField } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

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

  const [value, setValue] = useState({ hits: [] });
  const [ItemGrp, setItmGrp] = useState("");

  const FORM_INITAL_VALUE = {
    Itmgrp: "",
    ItmGrpNm: "",
    ItemgrpLabl: "",
    Itemgrpnamelabel: "",
  };

  const [values, setValues] = useState({
    Itmgrp: "",
    ItmGrpNm: "",
    ItemgrpLabl: "",
    Itemgrpnamelabel: "",
  });

  const itmgrpRef = useRef(null);
  const createBtnRef = useRef(null);
  const [open, setOpen] = useState(false);

  const popSucessNotify = () => {
    setOpen(true);
  };

  const clearData = () => {
    setValues(FORM_INITAL_VALUE);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const createItemGroup = () => {
    const fetchData = async () => {
      axios
        .post("http://localhost:8081/itemgroup/createnewitemgroup", {
          id: values.Itmgrp,
          name: values.ItmGrpNm,
          mod_by: "kanishka",
          mod_date: "2021-03-07",
          cre_by: "kanishka",
          cre_date: "2021-03-07",
        })
        .then(
          (response) => {
            console.log(response);
            popSucessNotify();
            clearData();
          },
          (error) => {
            console.log(error);
          }
        );
    };
    fetchData();
  };

  const handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    setValues({ ...values, [nam]: val });
  };

  const changeFocus = (event) => {
    if (event.target.name === "Itmgrp") {
      if (event.key === "Enter") {
        setItmGrp(event.target.value);
        // setValues({ ...values, ItemgrpLabl: value.title })
        itmgrpRef.current.focus();
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
        autoHideDuration={6000}
        message="Item Group Sucessfully Created"
      >
        <Alert onClose={handleClose} severity="success">
          Item Group Sucessfully Created.
        </Alert>
      </Snackbar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h6" variant="h6" align="left">
            Create Item Group
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-basic"
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
                variant="outlined"
                id="standard-basic"
                name="ItemgrpLabl"
                value={values.ItemgrpLabl}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Item Group Name"
                name="ItmGrpNm"
                inputRef={itmgrpRef}
                onChange={handleChange}
                value={values.ItmGrpNm}
                onKeyPress={changeFocus}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                id="standard-basic"
                name="Itemgrpnamelabel"
                value={values.Itemgrpnamelabel}
                disabled
              />
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
