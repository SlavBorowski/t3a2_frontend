import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { NavBar } from "./NavBar";

export function ProtectedRoute({ exact, path, component }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch("http://localhost:3000/status", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status >= 400) {
          throw new Error("not authorized");
        } else {
          const { jwt } = await response.json();
          localStorage.setItem("token", jwt);
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
          <NavBar />
          <Route exact={exact} path={path} component={component} />
        </>
      )
    );
  }
}