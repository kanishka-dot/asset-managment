import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { PORT, URL } from "../../connection/defaultconfig";
import { axios } from "../../connection/axios";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper_modal: {
    position: "absolute",
    width: 500,
    backgroundColor: "white",
    padding: theme.spacing(2, 4, 3),
  },
}));

const responsive = "vertical";
const tableBodyHeight = "100%";
const tableBodyMaxHeight = "";

const options = {
  elevation: 1,
  filter: false,
  print: false,
  download: false,
  filterType: "dropdown",
  responsive,
  tableBodyHeight,
  tableBodyMaxHeight,
  onRowsDelete: false,
  selectableRows: "none",
  rowsPerPageOptions: [3],
  rowsPerPage: 3,
  sortOrder: {
    name: "ID",
    direction: "desc",
  },
};
const header = ["ID", "User ID", "Location", "Action", "Date Time"];

export default function BasicTable() {
  const [data, setData] = useState();

  const getRecentUserLogs = () => {
    axios
      .get(`http://${URL}:${PORT}/get/userLog`)
      .then((response) => {
        const dataList = response.data.map((data) => [
          data.id,
          data.username,
          data.location,
          data.action,
          data.timestamp,
        ]);
        setData(dataList);
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  useEffect(() => {
    getRecentUserLogs();
  }, []);

  const body = <MUIDataTable data={data} columns={header} options={options} />;

  return body;
}
