import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../../dashboard/charts/Card";
import Barchart from "../../../dashboard/charts/Barchart";
import Piechart from "../../../dashboard/charts/Piechart";
import SimpleTable from "../../../components/Table/DataTable";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginLeft: "15rem",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* <main className={classes.content}> */}
      <Container maxWidth="lg" className={classes.container}>
        <Grid container justify="center" spacing={5}>
          {/* Chart */}
          <Grid item xs={4}>
            <SimpleCard bkcolor="#1565c2" count="25" />
          </Grid>
          <Grid item xs={4}>
            <SimpleCard bkcolor="#00b0ff" count="15" />
          </Grid>
          <Grid item xs={4}>
            <SimpleCard bkcolor="#3492ca" count="05" />
          </Grid>

          <Grid item xs={8}>
            <Barchart />
          </Grid>
          <Grid item xs={4}>
            <Piechart />
          </Grid>

          <Typography>Recent User Login</Typography>

          <Grid item xs={12}>
            <SimpleTable />
          </Grid>
        </Grid>
      </Container>
      {/* </main> */}
    </div>
  );
}
