import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import {
  IconButton,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
  OutlinedInput,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "linear-gradient(to right bottom, #1488CC, #2B32B2)",
    minHeight: "100vh",

  },

  margin: {
    margin: theme.spacing(2),
  },

  textField: {
    width: "40ch",
  },

  button: {
    width: "44ch",
    
  },

  grid2: {
    paddingTop: "10%",
    paddingLeft: "35%",
    paddingRight: "35%",
  },
  
  withoutLabel: {
    marginTop: theme.spacing(3),
  },

  form:{
    alignItems:"center"
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

}));

function Login() {
  const [values, setValues] = React.useState({
    currentpassword: "",
    newpassword: "",
    newRepassword: "",
    showNewPassword: false,
    showNewRePassword: false,
  });
  const classes = useStyles();
  let History = useHistory();

  function handleSubmit(e) {
    History.push("/app");
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowNewRePassword = () => {
    setValues({ ...values, showNewRePassword: !values.showNewRePassword });
  };

  const handleMouseDownNewRePassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <div className={classes.grid2}>
        <Grid container spacing={1}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <form className={classes.form} validate={true}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                >
                  <TextField
                    variant="outlined"
                    type="password"
                    id="currentpassword"
                    label="Current Password"
                    name="currentpassword"
                    disabled
                  />
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    labelWidth={110}
                    id="standard-adornment-password"
                    type={values.showNewPassword ? "text" : "password"}
                    value={values.newpassword}
                    onChange={handleChange("newpassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleMouseDownNewPassword}
                          onMouseDown={handleClickShowNewPassword}
                        >
                          {values.showNewPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Re-Enter New Password
                  </InputLabel>
                  <OutlinedInput
                    labelWidth={180}
                    id="standard-adornment-password"
                    type={values.showNewRePassword ? "text" : "password"}
                    value={values.newRepassword}
                    onChange={handleChange("newRepassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleMouseDownNewRePassword}
                          onMouseDown={handleClickShowNewRePassword}
                        >
                          {values.showNewRePassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  className={clsx(classes.button)}
                  type="submit"
                  variant="contained"
                  color="primary"
                  value="submit"
                >
                  Change Password
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
        </div>
    </div>
  );
}

export default Login;
