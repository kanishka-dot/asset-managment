import React from "react";
import MroGrn from "../../form/mro/MroGrn";
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
          <MroGrn />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateItem;
