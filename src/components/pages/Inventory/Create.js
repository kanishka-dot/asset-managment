import React from "react";
import MultiForm from "../../form/inventoryForm/MultiForm";
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
          <MultiForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateItem;
