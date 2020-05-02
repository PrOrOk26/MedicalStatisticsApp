import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Landing } from "./Landing/Landing.js";
import { AidsComponent } from "./AidsComponent/AidsComponent.js";
import { AdultMortalityComponent } from "./MortalityComponent/AdultMortalityComponent.js";
import { ChildMortalityComponent } from "./MortalityComponent/ChildMortalityComponent.js";
import { LifeExpectancyComponent } from "./LifeExpectancyComponent/LifeExpectancyComponent.js";

export function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/aids">
            <AidsComponent />
          </Route>
          <Route path="/mortality/adult">
            <AdultMortalityComponent />
          </Route>
          <Route path="/mortality/child">
            <ChildMortalityComponent />
          </Route>
          <Route path="/life_expectancy">
            <LifeExpectancyComponent />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}
