import React from "react";
import Header from "../header/Header";
import ADMINPANEL from "../../dashboard/SideNavBar/SideNav";
import MANAGERPANEL from "../../dashboard/SideNavBar_HO_Manager/SideNav";
import ITOFFICERPANEL from "../../dashboard/SideNavBar_HO_ITOfficer/SideNav";
import USERPANEL from "../../dashboard/SideNavBar_ITOfficer/SideNav";

export default function Layout() {
  const USER_DETAILS = JSON.parse(sessionStorage.getItem("user"));

  const ROLE = USER_DETAILS.ROLE;

  function getSideNav() {
    switch (ROLE) {
      case "ADMIN":
        return <ADMINPANEL />;
      case "MANAGER":
        return <MANAGERPANEL />;
      case "OFFICER":
        return <ITOFFICERPANEL />;
      case "USER":
        return <USERPANEL />;
      default:
    }
  }

  return (
    <div>
      {/* ****To provide diffrent layouts based on user role**** */}
      <Header />
      {/* <ADMINPANEL /> */}
      {getSideNav()}
    </div>
  );
}
