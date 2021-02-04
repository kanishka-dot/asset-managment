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

export default function AddressForm({
  formData,
  setValues,
  isError,
  setFinalError,
}) {
  const { userId, userName, NIC, location, role, status } = formData;

  const [error, setError] = useState({
    userId: "",
    userName: "",
    NIC: "",
    location: "",
    role: "",
  });

  /*Check user in db*/
  const getUser = async () => {
    const response = await axios
      .get("/user/getuser/10/kumara")
      .catch((err) => console.log("Error ", err));
    if (response) {
      console.log(response.data);
    }
  };

  /*Form Validation*/
  const ValidateUserName = () => {
    if (userName === "") {
      setError({ ...error, userName: "User Name is Required" });

      return false;
    } else setError({ ...error, userName: "" });
    return true;
  };

  const ValidateLocation = () => {
    if (location === "") {
      setError({ location: "Location is Required" });

      return false;
    } else setError({ location: "" });
    getUser();
    return true;
  };

  const ValidateUserID = () => {
    if (userId.length < 5) {
      setError({ userId: "User ID is Required" });

      return false;
    } else {
      setError({ userId: "" });

      return true;
    }
  };

  const ValidateNIC = () => {
    if (NIC.trim() === "") {
      setError({ NIC: "NIC No is Required" });

      return false;
    } else if (!(NIC.length === 10 || NIC.length === 12)) {
      setError({ NIC: "Invalid NIC No Format" });
      return false;
    } else {
      setError({ NIC: "" });
      return true;
    }
  };

  const ValidateUserRole = () => {
    if (role === "") {
      setError({ role: "Role is Required" });
      return false;
    } else setError({ role: "" });
    return true;
  };

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
              onBlur={ValidateLocation}
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
            onBlur={ValidateUserID}
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
            onBlur={ValidateUserName}
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
            onBlur={ValidateNIC}
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
              onBlur={ValidateUserRole}
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
