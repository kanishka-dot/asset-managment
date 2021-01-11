import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import INITDATA from "../../../data/user.create.data";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  FormHelperText,
} from "@material-ui/core";

export default function AddressForm({ formData, setValues }) {
  const { userId, userName, NIC, location, role, status } = formData;

  /*Drop down list items mapping*/
  const INITLOCATIONS = INITDATA.LOCATIONS.map((data) => (
    <option key={data.title} value={data.title}>
      {data.title}
    </option>
  ));

  const INITROLES = INITDATA.ROLES.map((data) => (
    <option key={data.title} value={data.title}>
      {data.title}
    </option>
  ));

  // const [error, setError] = useState(initialState);


  function formValidate(){

    if(userId ===""){
      console.log("userId Valid");
      
    }


  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <InputLabel htmlFor="age-native-simple">Location</InputLabel>
          <FormControl     fullWidth>
          <Select
            autoFocus
            fullWidth
            name="location"
            id="location"
            value={location}
            onChange={setValues}
            onClick={()=>{console.log("onBlur");}
          }
          >
            <option value="" />
            {INITLOCATIONS}
          </Select>
          <FormHelperText></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            id="standard-basic"
            label="User ID"
            name="userId"
            value={userId}
            onChange={setValues}
            onBlur={formValidate}
            
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-basic"
            label="User Name"
            name="userName"
            value={userName}
            onChange={setValues}
            helperText=""
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-basic"
            label="NIC"
            name="NIC"
            value={NIC}
            onChange={setValues}
          />
        </Grid>

        <Grid item xs={12}>
          <InputLabel htmlFor="age-native-simple">Role</InputLabel>
          <Select
            fullWidth
            name="role"
            id="role"
            value={role}
            onChange={setValues}
          >
            <option value="" />
            {INITROLES}
          </Select>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup row name="status" value={status} onChange={setValues}>
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="inactive"
                control={<Radio />}
                label="Inactive"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
