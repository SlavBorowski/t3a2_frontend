import React, { useState, useContext } from "react";
import { LoginContext } from '../App';

export function UserForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const { setLogin } = useContext(LoginContext);
  

  async function loginAttempt() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({auth: { email, password }}),
      });
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        setLogin(true);
        props.history.push("/profile");
      }
    } catch (err) {
      setErrMessage(err.message);
    }
  }

  async function SignUpAttempt() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sign-up`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user: { email, password } })
      });
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        loginAttempt()
      }
    } catch (err) {
      setErrMessage(err.message);
    }
  }


  async function onFormSubmit(event) {
    event.preventDefault();
    props.location.pathname === "/sign-up" ? SignUpAttempt() : loginAttempt()
  }

  return (
    <>
      {errMessage && <span>{errMessage}</span>}
      <form onSubmit={onFormSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {props.location.pathname === "/sign-up" && 
        <p>Test for sign up</p>
        }
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}