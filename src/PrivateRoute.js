import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Main from "./components/Main";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <>
            <Main />
            <RouteComponent {...routeProps} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
