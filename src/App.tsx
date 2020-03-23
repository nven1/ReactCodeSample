import React from "react";
import "./App.scss";
import AppHolder from "./components/AppHolder";
import { BrowserRouter, Route } from "react-router-dom";
import Endpoints from "./environments/endpoints";

function App() {
  //authentication
  return (
    <BrowserRouter>
      <Route path={Endpoints.appEndpoints.root} component={AppHolder} />
    </BrowserRouter>
  );
}

export default App;
