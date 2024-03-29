import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Menu, MenuItem, Button, Grid } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import sideNavWidth from "../../components/common attributes/comman";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Authentication from "../../auth/LogingAuth";
import { PORT, URL } from "../../connection/defaultconfig";
import { axios } from "../../connection/axios";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import clsx from "clsx";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

const drawerWidth = sideNavWidth;
// const spacingChgnPaswd = 10;
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: "white",
    padding: theme.spacing(2, 4, 3),
  },
  pwd_btn_set: {
    marginLeft: 257,
  },

  btn: {
    marginLeft: theme.spacing(1),
    float: "right",
  },
  btnyes: {
    float: "right",
  },

  // curr_pswd_fld: {
  //     paddingBottom: spacingChgnPaswd

  // },
  // new_pswd_fld: {
  //     paddingBottom: spacingChgnPaswd
  // },
  // re_pswd_fld: {
  //     paddingBottom: spacingChgnPaswd
  // },
  margin: {
    margin: theme.spacing(1),
  },

  textField: {
    width: "52ch",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    display: "flex",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#1565C0",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
}));

export default function Headers() {
  const classes = useStyles();
  const [snopen, setSnOpen] = useState(false);
  const [isLogOutModal, setIsLogOutModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState("");
  const [severity, setSeverity] = useState("warning");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [locationId, setLocationId] = useState();
  const [values, setValues] = useState({
    currentpassword: "",
    newpassword: "",
    newRepassword: "",
    showCurrentPassword: false,
    showNewPassword: false,
    showNewRePassword: false,
  });

  const initState = {
    currentpassword: "",
    newpassword: "",
    newRepassword: "",
    showCurrentPassword: false,
    showNewPassword: false,
    showNewRePassword: false,
  };
  const usehistory = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleModalOpen = (para) => {
    if (para === "logout") {
      setIsLogOutModal(true);
    } else {
      setIsLogOutModal(false);
    }
    setOpen(true);
  };

  function getUser() {
    const details = JSON.parse(sessionStorage.getItem("user"));
    setUser(details.USERID);
    setLocation(details.LOCATIONNAME);
    setLocationId(details.LOCATION);
  }
  const handleModalClose = () => {
    setValues(initState);
    setOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    Authentication.voidAuthentication();
    usehistory.push("/app/login");
  };

  const onClickChangePwd = () => {
    if (values.newpassword !== values.newRepassword) {
      setSeverity("error");
      setSnOpen(true);
      setMessage("Re-enterd new password not match with new password");
    } else {
      axios
        .post(
          `http://${URL}:${PORT}/change_password/${locationId}/${user}/${values.currentpassword}/${values.newpassword}`
        )
        .then((response) => {
          if (response.data[0] === "1") {
            setSeverity("success");
            setMessage(response.data[1]);
            setSnOpen(true);
            setValues(initState);
          } else {
            setSeverity("error");
            setMessage(response.data[1]);
            setSnOpen(true);
            setValues(initState);
          }
        })
        .catch((error) => {
          setSeverity("error");
          setMessage("Error. Check Console");
          setSnOpen(true);
          setValues(initState);
          console.error(`Error:${error}`);
        });
    }
  };

  const handleSnackBarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };

  const handleMouseDownCurrentPassword = (event) => {
    event.preventDefault();
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

  useEffect(() => {
    getUser();
  }, []);

  const logout = (
    <Grid className={classes.paper}>
      <p id="simple-modal-description">Are you sure to logout?</p>
      <Grid>
        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          onClick={handleModalClose}
        >
          No
        </Button>
        <Button
          className={classes.btnyes}
          variant="contained"
          onClick={handleLogout}
          color="primary"
        >
          Yes
        </Button>
      </Grid>
    </Grid>
  );

  const change_pwd = (
    <Grid container spacing={1} className={classes.paper}>
      <Typography variant="h6" gutterBottom className={classes.heading}>
        Change Password
      </Typography>
      <Grid item xs={12} className={classes.curr_pswd_fld}>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="standard-adornment-password">
            Current Password
          </InputLabel>
          <OutlinedInput
            labelWidth={128}
            id="standard-adornment-password"
            type={values.showCurrentPassword ? "text" : "password"}
            value={values.currentpassword}
            onChange={handleChange("currentpassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleMouseDownCurrentPassword}
                  onMouseDown={handleClickShowCurrentPassword}
                >
                  {values.showCurrentPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.new_pswd_fld}>
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
                  {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.re_pswd_fld}>
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
      </Grid>
      <Grid className={classes.pwd_btn_set}>
        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          onClick={handleModalClose}
        >
          Close
        </Button>
        <Button
          className={classes.btnyes}
          onClick={onClickChangePwd}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
        >
          {isLogOutModal ? logout : change_pwd}
        </Modal>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={snopen}
          onClose={handleSnackBarClose}
          autoHideDuration={3000}
        >
          <Alert onClose={handleSnackBarClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              IT Assets Management
            </Typography>
            <div>
              <IconButton
                color="inherit"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Typography align="center">{user}</Typography>
                <Typography align="center">{location}</Typography>
                <hr></hr>
                <MenuItem
                  onClick={() => {
                    handleModalOpen("password");
                  }}
                >
                  Change Password
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleModalOpen("logout");
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}
