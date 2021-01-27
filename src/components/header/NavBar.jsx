import {NavLink} from "react-router-dom";

export function NavBar() {
  return (
    <>
      <NavLink to="/">Home </NavLink>
      <NavLink to="/about">About </NavLink>
      <NavLink to="/landmarks">Places </NavLink>
      <NavLink to="/day_planner">Plans </NavLink>
      <NavLink to="/profile">Profile </NavLink>
    </>
  );
}