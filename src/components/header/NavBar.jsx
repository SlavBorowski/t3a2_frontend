import {NavLink} from "react-router-dom";
import { NavWrapper, NavButton } from '../../styles/NavBar'

export function NavBar() {
  return (
    <>
      <NavLink to="/">Home </NavLink>
      <NavLink to="/about">About </NavLink>
      <NavLink to="/landmarks/Paris">Places </NavLink>
      <NavLink to="/day_planner">Plans </NavLink>
      <NavLink to="/profile">Profile </NavLink>
    </>
  );
}