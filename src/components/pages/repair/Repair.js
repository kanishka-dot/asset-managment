import React from "react";
import Repair from "../../form/repair/Repair";
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
          <Repair />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateItem;
