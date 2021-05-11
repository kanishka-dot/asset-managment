import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logoimg from "../../../assets/images/Arpico1.jpg";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "linear-gradient(to right bottom, #1488CC, #2B32B2)",
    minHeight: "100vh",
  },

  background_img: {
    height: "250px",
    width: "250px",
  },
  paper_modal: {
    position: "absolute",
    width: 450,
    backgroundColor: "white",
    padding: theme.spacing(2, 4, 3),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  grid2: {
    paddingTop: "10%",
    paddingLeft: "35%",
    paddingRight: "35%",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },

  grid1_paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },

  login_header: {
    textAlign: "center",
    color: "#000000",
  },

  submit: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },

  logo: {
    width: "30%",
    height: "25%",
  },
}));

function Login({ userDetails, Errors, Loading }) {
  const classes = useStyles();
  const [isDisableBtn, setIsDisableBtn] = useState(false);

  const [loginDetails, setloginDetails] = useState({
    location: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (Loading) {
      setIsDisableBtn(true);
    } else {
      setIsDisableBtn(false);
    }
  }, [Loading]);

  const handleChange = (e) => {
    setloginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    userDetails(loginDetails);
  }

  return (
    <div className={classes.root}>
      <div className={classes.grid2}>
        <Grid container spacing={1}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <img src={logoimg} alt="Logo" className={classes.logo} />
              <Typography variant="h5" gutterBottom>
                IT Assets Management System
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Typography style={{ color: "red" }}>{Errors}</Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="location"
                  onChange={handleChange}
                  value={loginDetails.location}
                  label="Location"
                  name="location"
                  autoComplete="username"
                  autoFocus
                  required
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  onChange={handleChange}
                  value={loginDetails.username}
                  label="Username"
                  name="username"
                  autoComplete="username"
                  required
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  onChange={handleChange}
                  value={loginDetails.password}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                />
                <div className={classes.wrapper}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    value="submit"
                    className={classes.submit}
                    disabled={isDisableBtn}
                  >
                    LOG IN
                  </Button>
                  {Loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
                <Grid container>
                  <Grid item xs></Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Login;
