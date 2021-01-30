import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ exact, path, component }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        // console.log("Start of Auth Process:" + localStorage.getItem("token"));
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status >= 400) {
          throw new Error("not authorized");
        } else {
          const { jwt } = await response.json();
          if(jwt) {
            console.log("jwt: " + jwt)
            console.log("Before Set Token in Protected Route:" + localStorage.getItem("token"));
            localStorage.setItem("token", jwt);
            console.log("After Set Token in Protected Route:" + localStorage.getItem("token"));
          }
          setAuth(true);
          setLoading(false);
        }
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    }
    checkAuthStatus();
  }, []);

  if (!loading && !auth) {
    return <Redirect to="/login" />;
  } else {
    return (
      !loading && (
        <>
          <Route exact={exact} path={path} component={component} />
        </>
      )
    );
  }
}