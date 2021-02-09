import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Time from "../gadgets/Time";
import Box from "@material-ui/core/Box";
import SidebarListItem from "./SidebarListItem";
import SideNavItemGroup from "./SideNavItemGroup";
import Items from "./SideNavData";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Menu, MenuItem } from "@material-ui/core";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  timebar: {
    marginTop: 10,
    textAlign: "center",
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let sideNavDataDisplay = Items.map((data, index) => {
    if (data.items) {
      return (
        <SideNavItemGroup
          key={index}
          title={data.title}
          items={data.items}
          icon={data.icon}
        />
      );
    }
    return (
      <SidebarListItem
        key={index}
        text={data.title}
        icon={data.icon}
        route={data.path}
      />
    );
  });

  const drawer = (
    <div>
      <Box mt={4} textAlign="center">
        <Typography color="primary" variant="h5">
          <Time />
        </Typography>
      </Box>
      <div className={classes.toolbar} />
      <Divider />
      {sideNavDataDisplay}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
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
              <Typography align="center">
                Kanishka
          </Typography>
              <Typography align="center" >
                Homagama SC
          </Typography>
              <hr></hr>
              <MenuItem onClick={handleClose}>Change Password</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        {drawer}
      </Drawer>
    </div>
  );
}

export default ResponsiveDrawer;
