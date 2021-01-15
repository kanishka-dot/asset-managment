import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import INITDATA from "../../../data/user.create.data";
import FORM_VALIDATION from "./formValidation";

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

export default function AddressForm({ formData, setValues }) {
  const { userId, userName, NIC, location, role, status } = formData;
  const [error, setError] = useState(FORM_VALIDATION);

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
          <FormControl fullWidth error={Boolean(error?.location)}>
            <Select
              autoFocus
              fullWidth
              name="location"
              id="location"
              value={location}
              onChange={setValues}
              defaultValue=""
              onBlur={() => {
                if (location === "") {
                  setError({ location: "Location is Required" });
                } else setError({ location: "" });
              }}
            >
              {INITLOCATIONS}
            </Select>
            <FormHelperText>{error.location}</FormHelperText>
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
            onBlur={() => {
              if (userId.length < 5) {
                setError({ userId: "User ID is Required" });
              } else setError({ userId: "" });
            }}
            error={Boolean(error?.userId)}
            helperText={error.userId}
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
            onBlur={() => {
              if (userName === "") {
                setError({ userName: "User Name is Required" });
              } else setError({ userName: "" });
            }}
            error={Boolean(error?.userName)}
            helperText={error.userName}
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
            onBlur={() => {
              if (NIC.trim() === "") {
                setError({ NIC: "NIC No is Required" });
              } else if (!(NIC.length === 10 || NIC.length === 12)) {
                setError({ NIC: "Invalid NIC No Format" });
              } else {
                setError({ NIC: "" });
              }
            }}
            error={Boolean(error?.NIC)}
            helperText={error.NIC}
          />
        </Grid>

        <Grid item xs={12}>
          <InputLabel htmlFor="age-native-simple">Role</InputLabel>
          <FormControl fullWidth error={Boolean(error?.role)}>
            <Select
              fullWidth
              name="role"
              id="role"
              value={role}
              onChange={setValues}
              defaultValue=""
              onBlur={() => {
                if (role === "") {
                  setError({ role: "Role is Required" });
                } else setError({ role: "" });
              }}
            >
              {INITROLES}
            </Select>
            <FormHelperText>{error.role}</FormHelperText>
          </FormControl>
        
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
