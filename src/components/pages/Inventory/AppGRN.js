import React from "react";
import Form from "../../form/app_grn/Form";
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
          <Form />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateItem;
