import React, { useState } from "react";
import { LoggedOutNav } from '../header/LoggedOutNav'

export function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = {
      auth: { email, password },
    };
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        history.push("/profile");
      }
    } catch (err) {
      setErrMessage(err.message);
    }
  }

  return (
    <>
      <LoggedOutNav />
      <h1>Login</h1>
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
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}