import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../../dashboard/SideNavBar/SideNav";
import InventoryForm from "../pages/Inventory/Create";
import Search from "../pages/Inventory/Search";
import Transfer from "../../components/pages/Inventory/Transfer";
import Home from "../../components/pages/Home/Home";
import CreateUserForm from "../../components/pages/users/CreateUser";
import ResetPassword from "../pages/users/ResetPassword";
import Supplier from "../../components/pages/supplier/Supplier";
import Locations from "../../components/pages/locations/Locations";
import ItemGroup from "../../components/pages/Inventory/item_group/ItemGroup";
import SearchItemGroup from "../../components/pages/Inventory/item_group/search_itemgrps";
import SearchLocations from "../../components/pages/locations/searchlocation";
import SearchSupplier from "../../components/pages/supplier/SearchSupplier";
import InventoryGrn from "../../components/pages/Inventory/Grn";


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
        <Route path="/app/users/reset_password" component={ResetPassword} />
        <Route path="/app/suppliers/create" component={Supplier} />
        <Route path="/app/location/create" component={Locations} />
        <Route path="/app/inventory/item_group" component={ItemGroup} />
        <Route path="/app/suppliers/search" component={SearchSupplier} />
        <Route path="/app/inventory/grn" component={InventoryGrn} />
       
        <Route
          path="/app/inventory/itemgroup/search"
          component={SearchItemGroup}
        />
         <Route
          path="/app/location/search"
          component={SearchLocations}
        />
      </Switch>
    </>
  );
}

export default Layout;
