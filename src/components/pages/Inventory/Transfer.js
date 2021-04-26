import React from "react";
import GTNOUT from "../../form/Transfer/transfer";
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
          <GTNOUT />
        </Grid>
      </Grid>
    </div>
  );
}

export default Transfer;
