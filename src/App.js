import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "./auth/privateRoute";
import Loging from "./components/pages/login/login";
// import Password from "./components/pages/login/Password";
// import Card from "./dashboard/gadgets/Card"
//  import Barchart from "./dashboard/gadgets/Barchart"
import Layout from "./components/layout/Layout";
import InventoryIN from "./components/form/inventoryIN/InventoryIN"
import Grn from "./components/pages/Inventory/Grn"

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Grn} />
          <PrivateRoute path="/app" component={Layout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
