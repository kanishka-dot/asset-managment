import React from "react";
import Receive from "../../form/receive/Receive";
import { Grid } from "@material-ui/core";

const divStyle = {
  marginTop: "1rem",
  marginLeft: "15rem",
};

function CreateItem() {
  return (
    <div style={divStyle}>
      <Grid container>
        <Grid item xs>
          <Receive />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateItem;
