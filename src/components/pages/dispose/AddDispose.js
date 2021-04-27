import React from "react";
import ADDDispose from "../../form/dispose/addDispose";
import { Grid } from "@material-ui/core";

const divStyle = {
  marginTop: "1rem",
  marginLeft: "15rem",
};

function Transfer() {
  return (
    <div style={divStyle}>
      <Grid container>
        <Grid item xs>
          <ADDDispose />
        </Grid>
      </Grid>
    </div>
  );
}

export default Transfer;
