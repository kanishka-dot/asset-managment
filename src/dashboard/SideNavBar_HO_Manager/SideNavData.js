import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
// import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import AddIcon from "@material-ui/icons/Add";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ReportIcon from "@material-ui/icons/Report";
import SearchIcon from "@material-ui/icons/Search";
// import CallMadeIcon from "@material-ui/icons/CallMade";
// import CallReceivedIcon from "@material-ui/icons/CallReceived";
import PeopleIcon from "@material-ui/icons/People";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import StarsIcon from "@material-ui/icons/Stars";
// import BuildIcon from "@material-ui/icons/Build";
// import DoneIcon from "@material-ui/icons/Done";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
// import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
// import AutorenewIcon from "@material-ui/icons/Autorenew";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
// import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import DeleteIcon from "@material-ui/icons/Delete";
// import RemoveIcon from "@material-ui/icons/Remove";

const color = "#FFFFFF";

const Items = [
  {
    title: "Dashboard",
    icon: <DashboardIcon style={{ color: color }} />,
    path: "/",
  },
  {
    title: "Items",
    icon: <StarsIcon style={{ color: color }} />,
    items: [
      {
        title: "Create Item Code",
        path: "/app/inventory/create",
        icon: <AddIcon style={{ color: color }} />,
      },
      {
        title: "Create Item Group",
        path: "/app/inventory/item_group",
        icon: <AddIcon style={{ color: color }} />,
      },

      {
        title: "Search Item Group",
        path: "/app/inventory/itemgroup/search",
        icon: <SearchIcon style={{ color: color }} />,
      },
    ],
  },

  {
    title: "Transcations",
    icon: <SyncAltIcon style={{ color: color }} />,
    items: [
      {
        title: "Approve GRN",
        path: "/app/inventory/approve_grn",
        icon: <ThumbUpIcon style={{ color: color }} />,
      },
    ],
  },

  {
    title: "Dispose Inventory",
    icon: <DeleteIcon style={{ color: color }} />,
    items: [
      {
        title: "Approve Dispose Inventory",
        path: "/app/inventory/dispose/save",
        icon: <ThumbUpIcon style={{ color: color }} />,
      },
    ],
  },
  {
    title: "Suppliers",
    icon: <SupervisedUserCircleIcon style={{ color: color }} />,
    items: [
      {
        title: "Create Suppliers",
        path: "/app/suppliers/create",
        icon: <AddIcon style={{ color: color }} />,
      },
      {
        title: "Search Suppliers",
        path: "/app/suppliers/search",
        icon: <SearchIcon style={{ color: color }} />,
      },
    ],
  },
  {
    title: "Users",
    icon: <PeopleIcon style={{ color: color }} />,
    items: [
      {
        title: "Create User",
        path: "/app/users/createuser",
        icon: <AddIcon style={{ color: color }} />,
      },
      // {
      //   title: "Search Users",
      //   path: "/app/users/search",
      //   icon: <SearchIcon style={{ color: color }} />,
      // },
      // {
      //   title: "Reset Password",
      //   path: "/app/users/reset_password",
      //   icon: <AutorenewIcon style={{ color: color }} />,
      // },
    ],
  },
  {
    title: "Locations",
    icon: <LocationCityIcon style={{ color: color }} />,
    items: [
      {
        title: "Create Locations",
        path: "/app/location/create",
        icon: <AddIcon style={{ color: color }} />,
      },
      {
        title: "Search locations",
        path: "/app/location/search",
        icon: <SearchIcon style={{ color: color }} />,
      },
    ],
  },
  {
    title: "Reports",
    icon: <FileCopyIcon style={{ color: color }} />,
    items: [
      {
        title: "Inventory Items Reports",
        path: "/app/inventory/itemcode/search",
        icon: <ReportIcon style={{ color: color }} />,
      },
      {
        title: "Pending Repair Items Reports",
        path: "/app/inventory/pending/repair",
        icon: <FileCopyIcon style={{ color: color }} />,
      },
      {
        title: "Pending Repair Beyond 3 Days Reports",
        path: "/app/inventory/pending/repairbeyond3days",
        icon: <FileCopyIcon style={{ color: color }} />,
      },
    ],
  },
];

export default Items;
