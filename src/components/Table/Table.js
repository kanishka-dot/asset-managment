import React from "react";
import MUIDataTable from "mui-datatables";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";

export default function Table(props) {
  const header = props.header;
  const dataAdd = props.tableData;
  const responsive = "vertical";
  const tableBodyHeight = "100%";
  const tableBodyMaxHeight = "";

  // const [responsive, setResponsive] = useState("vertical");
  // const [tableBodyHeight, setTableBodyHeight] = useState("100%");
  // const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

  

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
  };

  // const data = [
  //   // ["1103568", "21/01/2021", "IT031","11054","125465IT","12124587112545","30,000","5","Sadun"],
  //   dataAdd
  // ];

  return (
    <React.Fragment>
      {/* <FormControl>
        <InputLabel id="demo-simple-select-label">Responsive Option</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={responsive}
          style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
          onChange={(e) => setResponsive(e.target.value)}
        >
          <MenuItem value={"vertical"}>vertical</MenuItem>
          <MenuItem value={"standard"}>standard</MenuItem>
          <MenuItem value={"simple"}>simple</MenuItem>

          <MenuItem value={"scroll"}>scroll (deprecated)</MenuItem>
          <MenuItem value={"scrollMaxHeight"}>
            scrollMaxHeight (deprecated)
          </MenuItem>
          <MenuItem value={"stacked"}>stacked (deprecated)</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Table Body Height</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tableBodyHeight}
          style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
          onChange={(e) => setTableBodyHeight(e.target.value)}
        >
          <MenuItem value={""}>[blank]</MenuItem>
          <MenuItem value={"400px"}>400px</MenuItem>
          <MenuItem value={"800px"}>800px</MenuItem>
          <MenuItem value={"100%"}>100%</MenuItem>
        </Select>
      </FormControl> */}

      <MUIDataTable   
        title={"Search Items"}
        data={dataAdd}
        columns={header}
        options={options}
      />
    </React.Fragment>
  );
}
