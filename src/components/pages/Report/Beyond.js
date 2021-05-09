import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { axios } from "../../../connection/axios";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { PORT, URL } from "../../../connection/defaultconfig";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    paddingTop: "3rem",
    width: "50rem",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "50rem",
      marginLeft: "18rem",
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

export default function PendingRepairItems() {
  const classes = useStyles();
  const responsive = "vertical";
  const tableBodyHeight = "100%";
  const tableBodyMaxHeight = "";
  const [fetchTableData, setFetchTableData] = useState();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [SnOpen, setSnOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setSnOpen(false);
  };

  const onClickGenReport = () => {
    setSeverity("info");
    setMessage("please wait.Report Generating.");
    setSnOpen(true);

    axios
      .get(`http://${URL}:${PORT}/report/pendingrepair/greater3days`)
      .then((response) => {
        if (response.data[0] === "1") {
          setSeverity("success");
          setMessage(response.data[1]);
          setSnOpen(true);
        } else {
          setSeverity("error");
          setMessage(response.data[1]);
          setSnOpen(true);
        }
      })
      .catch((error) => {
        setSeverity("error");
        setMessage("Error. Please check the concole");
        setSnOpen(true);
        console.error(`Error:${error}`);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={SnOpen}
        onClose={handleClose}
        message={message}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={2}>
          <Typography align="center" variant="h6" gutterBottom>
            Pending Repair Beyond 3 days Items
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={onClickGenReport}
          >
            Generate Report
          </Button>
        </Paper>
      </main>
    </React.Fragment>
  );
}
