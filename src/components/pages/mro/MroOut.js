import React from "react";
import MroOut from "../../form/mro/MroOut";
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
          <MroOut />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateItem;
