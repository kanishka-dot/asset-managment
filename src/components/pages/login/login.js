import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import logoimg from "../../../assets/images/Arpico1.jpg";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "linear-gradient(to right bottom, #1488CC, #2B32B2)",
    minHeight: "100vh",
  },

  background_img: {
    height: "250px",
    width: "250px",
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

  logo: {
    width: "40%",
    height: "30%",
  },
}));




function Login() {

  const classes = useStyles();
  let History = useHistory();

  
  function handleSubmit(e) {
   
    History.push('/app/home')
  }


  return (
    <div className={classes.root}>
      <div className={classes.grid2}>
        <Grid container spacing={1}>
          {/* <Hidden smDown>
            <Grid item xs>
              <Paper className={classes.grid1_paper}>
                <div className={classes.login_header}>
                  <ThemeProvider theme={theme}>
                    <Typography variant="subtitle2">
                      IT Related Inventory Management and Help Desk
                    </Typography>
                  </ThemeProvider>
                  <Box>
                    <img
                      src={BackgroundImg}
                      className={classes.background_img}
                    />
                  </Box>

                  <div>
                    <Typography variant="caption">
                      Login to Access Dashboard
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Hidden> */}
          <Hidden>
            <Grid item xs>
              <Paper className={classes.paper}>
                <img src={logoimg} alt="Logo" className={classes.logo} />
                <Typography variant="subtitle2" gutterBottom>
                  IT Related Inventory Management
                </Typography>
                <form className={classes.form} validate={true} onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="location"
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
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    required
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
               
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    value="submit"
                    className={classes.submit}
                  >
                  
                    LOG IN
                  </Button>
               
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </form>
                <div style={{ paddingTop: "10px" }}>
                  <Copyright />
                </div>
              </Paper>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </div>
  );
}

export default Login;
