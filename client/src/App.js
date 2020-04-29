import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Landing } from "./Landing/Landing.js";
import { AidsComponent } from "./AidsComponent/AidsComponent.js";

export function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/aids">
          <AidsComponent />
        </Route>
      </Switch>
    </Router>
  );
}
