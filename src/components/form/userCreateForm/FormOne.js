import React, { useState } from "react";
import { axios } from "../../../connection/axios";
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
  MenuItem,
} from "@material-ui/core";

export default function AddressForm({formData, setValues}) {


  const { userId, userName, NIC, location, role, status } = formData;



const handleInputChange = (event) =>{

}



  // const getUser = async () => {
  //   const response = await axios
  //     .get("/user/getuser/10/kumara")
  //     .catch((err) => console.log("Error ", err));
  //   if (response) {
  //     console.log(response.data);
  //   }
  // };

  /*Drop down list items mapping*/
  const INITLOCATIONS = INITDATA.LOCATIONS.map((data) => (
    <MenuItem key={data.title} value={data.title}>
      {data.title}
    </MenuItem>
  ));

  const INITROLES = INITDATA.ROLES.map((data) => (
    <MenuItem key={data.title} value={data.title}>
      {data.title}
    </MenuItem>
  ));

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <InputLabel htmlFor="age-native-simple">Location</InputLabel>
          <FormControl fullWidth >
            <Select
              autoFocus
              fullWidth
              name="location"
              id="location"
              value={location}
              onChange={}
              defaultValue=""

            >
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
            onChange={}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-basic"
            label="User Name"
            name="userName"
            value={userName}
            onChange={}
           

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-basic"
            label="NIC"
            name="NIC"
            value={NIC}
            onChange={}


          />
        </Grid>

        <Grid item xs={12}>
          <InputLabel htmlFor="age-native-simple">Role</InputLabel>
          <FormControl fullWidth >
            <Select
              fullWidth
              name="role"
              id="role"
              value={role}
              onChange={}
              defaultValue=""

            >
              {INITROLES}
            </Select>
            <FormHelperText></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup row name="status" value={status} >
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
