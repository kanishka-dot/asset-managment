import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../../dashboard/SideNavBar/SideNav";
import InventoryForm from "../pages/Inventory/Create";
import Search from "../pages/Inventory/Search";
import Transfer from "../../components/pages/Inventory/Transfer";
import Home from "../../components/pages/Home/Home";
import CreateUserForm from "../../components/pages/users/CreateUser";

function Layout() {
  return (
    <>
      <Dashboard />
      <Switch>
        <Route exact path="/app/home" component={Home} />
        <Route path="/app/inventory/create" component={InventoryForm} />
        <Route path="/app/inventory/search" component={Search} />
        <Route path="/app/inventory/transfer" component={Transfer} />
        <Route path="/app/users/createuser" component={CreateUserForm} />
      </Switch>
    </>
  );
}

export default Layout;
