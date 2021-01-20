import React from "react";
import GRNIN from "../../form/inventoryIN/InventoryIN";
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
          <GRNIN />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateItem;
