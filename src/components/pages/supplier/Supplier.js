import React from "react";
import Supplier from "../../form/supplierForm/Supplier";
import { Grid } from "@material-ui/core";

const divStyle = {
  marginTop: "1rem",
  marginLeft: "15rem",
};

function CreateUserForm() {
  return (
    <div style={divStyle}>
      <Grid container>
        <Grid item xs>
          <Supplier />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateUserForm;
