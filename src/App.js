import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Albums } from "./Components/Albums/Albums";
import { MainMenu } from "./Components/Shared/Menu";
import { ToDos } from "./Components/ToDos/ToDos";

export default function App() {
  return (
    <Router>
      <div>
        <MainMenu />

        <Switch>
          <Route path="/albums">
            <Albums />
          </Route>
          <Route path="/todos">
            <ToDos />
          </Route>
          <Route path="/">
            <h2>Home</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
