import React from "react";
import SaveDispose from "../../form/dispose/saveDispose";
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
          <SaveDispose />
        </Grid>
      </Grid>
    </div>
  );
}

export default Transfer;
