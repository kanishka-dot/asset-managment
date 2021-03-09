import React from "react";
import CollapseTable from "../../Table/CollapseTable";
import { Grid } from "@material-ui/core";

const divStyle = {
    marginTop: "1rem",
    marginLeft: "15rem",
  };
  


function CreateUserForm() {
  return (
    <div style={divStyle}>
    <Grid container>
      <Grid item xs>
          <CollapseTable />

        </Grid>
      </Grid>
    </div>
  );
}

export default CreateUserForm;
