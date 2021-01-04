import React from "react";
import MultiForm from "../../form/userCreateForm/MultiForm";
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
          <MultiForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateUserForm;
