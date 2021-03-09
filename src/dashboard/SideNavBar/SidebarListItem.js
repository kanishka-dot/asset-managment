import React from "react";
import { Link } from "react-router-dom";
import { ListItemText } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";

function SidebarListItem(props) {
  return (
    <List>
      <Link
        to={props.route}
        style={{ textDecoration: "none", color: "#FFFFFF" }}
      >
        <ListItem button>
          <ListItemIcon>{props.icon}</ListItemIcon>
          <ListItemText primary={props.text} />
        </ListItem>
      </Link>
    </List>
  );
}

export default SidebarListItem;
