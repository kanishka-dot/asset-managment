import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { axios } from "../../../../connection/axios";
import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { PORT, URL } from "../../../../connection/defaultconfig";

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

export default function SearchItemGroups() {
  const classes = useStyles();
  const responsive = "vertical";
  const tableBodyHeight = "100%";
  const tableBodyMaxHeight = "";
  const [fetchTableData, setFetchTableData] = useState();
  const [open, setOpen] = useState(false);

  const header = [
    "Item Group",
    "Item Group Name",
    "Depriciation Rate(%)",
    "Create By",
    "Create Date",
  ];
  const tableData = fetchTableData;
  const options = {
    elevation: 5,
    filter: false,
    print: false,
    download: false,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onRowsDelete: false,
    selectableRows: "none",
  };

  const popErrorNotify = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`http://${URL}:${PORT}/itemgroup/getitemgroups`).then(
        (response) => {
          const data = response.data.map((data) => [
            data.id,
            data.name,
            data.depriciation,
            data.cre_by,
            data.cre_date,
          ]);
          setFetchTableData(data);
        },
        (error) => {
          popErrorNotify();
          console.log(error);
        }
      );
    };
    fetchData();

    // const fetchData = async () => {
    //   const result = await axios(
    //     "http://localhost:8081/itemgroup/getitemgroups"
    //   );

    //   const data = result.data.map((data) => [
    //     data.id,
    //     data.name,
    //     data.cre_by,
    //     data.cre_date,
    //   ]);
    //   console.log(data);
    //   setFetchTableData(data);
    // };

    // fetchData();
  }, []);

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
        message="Problem in Network Connection. Please Check"
      >
        <Alert onClose={handleClose} severity="error">
          Problem in Network Connection. Please Check
        </Alert>
      </Snackbar>
      <main className={classes.layout}>
        <MUIDataTable
          title={"Search Items Groups"}
          data={tableData}
          columns={header}
          options={options}
        />
      </main>
    </React.Fragment>
  );
}
