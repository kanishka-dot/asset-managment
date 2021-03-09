import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import AddIcon from "@material-ui/icons/Add";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ReportIcon from "@material-ui/icons/Report";
import SearchIcon from "@material-ui/icons/Search";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import PeopleIcon from "@material-ui/icons/People";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import StarsIcon from "@material-ui/icons/Stars";
import BuildIcon from "@material-ui/icons/Build";
import DoneIcon from "@material-ui/icons/Done";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const color = "#FFFFFF" 


const Items = [
  {
    title: "Dashboard",
    icon: <DashboardIcon style={{ color: color }}  />,
    path: "/app/home",
  },
  {
    title: "Items",
    icon: <StarsIcon style={{ color: color }} />,
    items: [
      {
        title: "Create Item Code",
        path: "/app/inventory/create",
        icon: <AddIcon style={{ color: color }}  />,
      },
      {
        title: "Create Item Group",
        path: "/app/inventory/item_group",
        icon: <AddIcon style={{ color: color }}  />,
      },
      {
        title: "Search Item Group",
        path: "/app/inventory/itemgroup/search",
        icon: <SearchIcon style={{ color: color }}  />,
      },
    ],
  },

  {
    title: "Transcations",
    icon: <SyncAltIcon style={{ color: color }}  />,
    items: [
      {
        title: "GRN",
        path: "/app/inventory/grn",
        icon: <DirectionsBoatIcon style={{ color: color }}  />,
      },

      {
        title: "GTN IN",
        path: "/app/inventory/receive",
        icon: <CallReceivedIcon style={{ color: color }}  />,
      },
      {
        title: "GTN OUT",
        path: "/app/inventory/transfer",
        icon: <CallMadeIcon style={{ color: color }}  />,
      },
    ],
  },
  {
    title: "Repair Items",
    icon: <BuildIcon style={{ color: color }}  />,
    items: [
      {
        title: "Repair IN",
        path: "/app/inventory/repair/add",
        icon: <AddIcon style={{ color: color }}  />,
      },

      {
        title: "Repair OUT",
        path: "/app/inventory/repair/complete",
        icon: <DoneIcon style={{ color: color }}  />,
      },
      {
        title: "Search",
        path: "/app/inventory/repair/search",
        icon: <SearchIcon style={{ color: color }}  />,
      },
    ],
  },
  {
    title: "Suppliers",
    icon: <SupervisedUserCircleIcon style={{ color: color }}  />,
    items: [
      {
        title: "Create Suppliers",
        path: "/app/suppliers/create",
        icon: <AddIcon style={{ color: color }}  />,
      },
      {
        title: "Search Suppliers",
        path: "/app/suppliers/search",
        icon: <SearchIcon style={{ color: color }}  />,
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
        icon: <AddIcon style={{ color: color }}  />,
      },
      {
        title: "Search Users",
        path: "/app/users/search",
        icon: <SearchIcon style={{ color: color }}  />,
      },
      {
        title: "Reset Password",
        path: "/app/users/reset_password",
        icon: <AutorenewIcon style={{ color: color }}  />,
      },
    ],
  },
  {
    title: "Locations",
    icon: <LocationCityIcon style={{ color: color }}  />,
    items: [
      {
        title: "Create Locations",
        path: "/app/location/create",
        icon: <AddIcon style={{ color: color }}  />,
      },
      {
        title: "Search locations",
        path: "/app/location/search",
        icon: <SearchIcon style={{ color: color }}  />,
      },
    ],
  },
  {
    title: "Reports",
    icon: <FileCopyIcon style={{ color: color }} />,
    items: [
      {
        title: "Exception Reports",
        path: "/app/reports/create",
        icon: <ReportIcon style={{ color: color }} />,
      },
    ],
  },
];

export default Items;
