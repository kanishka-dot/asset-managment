import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
// import ViewWeekIcon from "@material-ui/icons/ViewWeek";
// import AddIcon from "@material-ui/icons/Add";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ReportIcon from "@material-ui/icons/Report";
import SearchIcon from "@material-ui/icons/Search";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
// import PeopleIcon from "@material-ui/icons/People";
import LocationCityIcon from "@material-ui/icons/LocationCity";
// import StarsIcon from "@material-ui/icons/Stars";
// import BuildIcon from "@material-ui/icons/Build";
// import DoneIcon from "@material-ui/icons/Done";
// import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
// import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
// import AutorenewIcon from "@material-ui/icons/Autorenew";
// import ThumbUpIcon from "@material-ui/icons/ThumbUp";
// import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
// import DeleteIcon from "@material-ui/icons/Delete";
// import RemoveIcon from "@material-ui/icons/Remove";

const color = "#FFFFFF";

const Items = [
  {
    title: "Dashboard",
    icon: <DashboardIcon style={{ color: color }} />,
    path: "/",
  },

  {
    title: "Transcations",
    icon: <SyncAltIcon style={{ color: color }} />,
    items: [
      {
        title: "GTN IN",
        path: "/app/inventory/receive",
        icon: <CallReceivedIcon style={{ color: color }} />,
      },
      {
        title: "GTN OUT",
        path: "/app/inventory/transfer",
        icon: <CallMadeIcon style={{ color: color }} />,
      },
    ],
  },
  {
    title: "Locations",
    icon: <LocationCityIcon style={{ color: color }} />,
    items: [
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
    ],
  },
];

export default Items;
