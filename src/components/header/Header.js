import React, { useState } from 'react'
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Menu, MenuItem,Button, Grid } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import sideNavWidth from "../../components/common attributes/comman"

const drawerWidth = sideNavWidth;

const useStyles = makeStyles((theme) => ({
    

    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        padding: theme.spacing(2, 4, 3),
      },

      btn: {
        marginLeft: theme.spacing(1),
        float: "right",
      },
      btnyes: {
        float: "right",
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
    const [anchorEl, setAnchorEl] = useState(null);


    const handleModalOpen = () => {
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

    const body = (
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
                    {body}
                </Modal>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap className={classes.title}>
                            BreadCrumb
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
                                <MenuItem onClick={handleClose}>Change Password</MenuItem>
                                <MenuItem onClick={handleModalOpen}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </React.Fragment >
    )
}