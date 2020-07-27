import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Authentication from "./Contexts/Authentication";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import Home from "./Pages/Home";

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
        </Switch>
      </Authentication>
    </Router>
  );
}

export default App;
