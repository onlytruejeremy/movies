import React from "react";
import "./styles.css";
import Main from "./components/Main";
import { Route, Switch } from "react-router-dom";
import Details from "./components/views/Details";
import MainCards from "./components/views/MainCards";
import Account from "./components/account/Account";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/account/Login";
import Favourites from "./components/views/Favourites"
export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/details/:id">
          <Details />
        </Route>
        <Route path="/" exact>
          <Main />
          <MainCards />
        </Route>
        <PrivateRoute path="/account" component={Account}></PrivateRoute>
        <PrivateRoute path="/favourites" component={Favourites}></PrivateRoute>
        <Route path="/login" exact>
          <Main />
          <Login />
        </Route>
      </Switch>
    </div>
  );
}
