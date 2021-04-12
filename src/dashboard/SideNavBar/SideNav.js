import React from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SidebarListItem from "./SidebarListItem";
import SideNavItemGroup from "./SideNavItemGroup";
import Items from "./SideNavData";
import logoimg from "../../assets/images/Arpico1.jpg";
import sideNavWidth from "../../components/common attributes/comman"


const drawerWidth = sideNavWidth;

const useStyles = makeStyles((theme) => ({


  logo: {
    width: "40%",
    height: "30%",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1565C0"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

}));



function SideNav() {
  const classes = useStyles();

  const color = "#FFFFFF"

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
    <React.Fragment >
      <Box mt={4} textAlign="center">
        <Typography style={{ color: color }} variant="h5">
          <img src={logoimg} alt="Logo" className={classes.logo} />
         
        </Typography>
      </Box>
      {/* <div className={classes.toolbar} /> */}
      <Divider />
      {sideNavDataDisplay}
    </React.Fragment>
  );



  return (
    <React.Fragment >
      <div className={classes.root}>
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
    </React.Fragment>
  );
}

export default SideNav;
