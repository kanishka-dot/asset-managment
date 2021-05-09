import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../../dashboard/charts/Card";
// import Barchart from "../../../dashboard/charts/Barchart";
// import Piechart from "../../../dashboard/charts/Piechart";
import SimpleTable from "../../../components/Table/DataTable";
import { Typography } from "@material-ui/core";
import { PORT, URL } from "../../../connection/defaultconfig";
import { axios } from "../../../connection/axios";

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

  const [invitems, setInvitems] = useState("loading...");
  const [repItems, setRepItems] = useState("loading...");
  const [disItems, setDisItems] = useState("loading...");

  const getAllInvItems = () => {
    axios
      .get(`http://${URL}:${PORT}/inventory/item/count`)
      .then((response) => {
        const data = response.data;
        setInvitems(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  const getAllPenRepItems = () => {
    axios
      .get(`http://${URL}:${PORT}/inventory/repair/penitems/count`)
      .then((response) => {
        const data = response.data;
        setRepItems(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  const getDisItemCount = () => {
    axios
      .get(`http://${URL}:${PORT}/inventory/dispose/item/count`)
      .then((response) => {
        const data = response.data;
        setDisItems(data);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  useEffect(() => {
    getAllInvItems();
    getAllPenRepItems();
    getDisItemCount();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* <main className={classes.content}> */}
      <Container maxWidth="lg" className={classes.container}>
        <Grid container justify="center" spacing={5}>
          {/* Chart */}
          <Grid item xs={4}>
            <SimpleCard
              name="Total Active Inventory Item Count"
              bkcolor="#1565c2"
              count={invitems}
              url="/app/inventory/itemcode/search"
            />
          </Grid>
          <Grid item xs={4}>
            <SimpleCard
              name="Pending Repair Items count"
              bkcolor="#00b0ff"
              count={repItems}
              url="/app/inventory/pending/repair"
            />
          </Grid>
          <Grid item xs={4}>
            <SimpleCard
              name="Dispose Items Count"
              bkcolor="#3492ca"
              count={disItems}
              url="/app/inventory/itemcode/search"
            />
          </Grid>

          {/* <Grid item xs={8}>
            <Barchart />
          </Grid>
          <Grid item xs={4}>
            <Piechart />
          </Grid> */}

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
