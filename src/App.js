import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import PrivateRoute from "./auth/privateRoute";
import Loging from "./main/login";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Loging} />
          <PrivateRoute path="/app" component={Layout} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
