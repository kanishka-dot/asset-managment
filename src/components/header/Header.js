import React, { useState } from 'react'
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Menu, MenuItem, Button, Grid } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import sideNavWidth from "../../components/common attributes/comman"
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@material-ui/core";
import clsx from "clsx";


const drawerWidth = sideNavWidth;
// const spacingChgnPaswd = 10;
const useStyles = makeStyles((theme) => ({


    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: 'white',
        padding: theme.spacing(2, 4, 3),

    },
    pwd_btn_set:{
        marginLeft:257
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        display: "flex",

    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,

        },
        backgroundColor: "#1565C0"
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
    },
}));

export default function Headers() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isLogOutModal, setIsLogOutModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [values, setValues] = useState({
        currentpassword: "",
        newpassword: "",
        newRepassword: "",
        showCurrentPassword: false,
        showNewPassword: false,
        showNewRePassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleModalOpen = (para) => {
        if (para === 'logout') {
            setIsLogOutModal(true)
        } else {
            setIsLogOutModal(false)
        }
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
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


    const logout = (
        <Grid className={classes.paper} >
            <p id="simple-modal-description">
                Are you sure to logout?
          </p>
            <Grid >
                <Button className={classes.btn} variant="contained" color="secondary" onClick={handleModalClose}>No</Button>
                <Button className={classes.btnyes} variant="contained" color="primary">Yes</Button>

            </Grid>

        </Grid>
    );

    const change_pwd = (

        <Grid container spacing={1} className={classes.paper} >
              <Typography variant="h6" gutterBottom className={classes.heading}>
            Change Password
          </Typography>
            <Grid item xs={12} className={classes.curr_pswd_fld} >
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
            </Grid>
            <Grid item xs={12} className={classes.re_pswd_fld} >
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
            <Grid  className={classes.pwd_btn_set} >
             
                <Button className={classes.btn} variant="contained" color="secondary" onClick={handleModalClose}>Close</Button>
                <Button className={classes.btnyes} variant="contained" color="primary">Save</Button>
              
            </Grid>
        </Grid>

    );


    return (
        <React.Fragment >
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
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap className={classes.title}>
                     
            IT Related Inventory Management
     
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
                                <Typography align="center">Kanishka</Typography>
                                <Typography align="center">Homagama SC</Typography>
                                <hr></hr>
                                <MenuItem onClick={() => { handleModalOpen('password') }}>Change Password</MenuItem>
                                <MenuItem onClick={() => { handleModalOpen('logout') }}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </React.Fragment >
    )
}