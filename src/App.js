import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Authentication from "./Contexts/Authentication";
import { ProtectedRoute } from "./Components/ProtectedRoute";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Supplier from "./Pages/Supplier";

function App() {
  return (
    <Router>
      <Authentication>
        <Switch>
          <Route path="/" exact>
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <ProtectedRoute path="/home" component={Home}></ProtectedRoute>
          <ProtectedRoute
            path="/supplier"
            component={Supplier}
          ></ProtectedRoute>
        </Switch>
      </Authentication>
    </Router>
  );
}

export default App;
