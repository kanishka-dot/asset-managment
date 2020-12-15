import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "./auth/privateRoute";
import Loging from "./components/pages/login/login";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Loging} />
          <PrivateRoute path="/app" component={Layout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
