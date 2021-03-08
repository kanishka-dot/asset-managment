import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { axios } from "../../../../connection/axios";
import MUIDataTable from "mui-datatables";
import { Button } from "@material-ui/core";

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

export default function SearchLocations() {
  const classes = useStyles();
  const responsive = "vertical";
  const tableBodyHeight = "100%";
  const tableBodyMaxHeight = "";
  const [fetchTableData, setFetchTableData] = useState();

  const header = ["Item Group", "Item Group Name", "Create By", "Create Date"];
  const tableData = [[<Button>Test</Button>,"name","year","age"]];
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
    selectableRows: false
  };

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios(
//         "http://localhost:8081/itemgroup/getitemgroups"
//       );

//       const data = result.data.map((data) => [
//         data.id,
//         data.name,
//         data.cre_by,
//         data.cre_date,
//       ]);
//       console.log(data);
//       setFetchTableData(data);
//     };

//     fetchData();
//   }, []);

  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>
        <MUIDataTable
          title={"Search Locations"}
          data={tableData}
          columns={header}
          options={options}
        />
      </main>
    </React.Fragment>
  );
}
