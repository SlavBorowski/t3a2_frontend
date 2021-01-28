import {NavLink} from "react-router-dom";
import { NavWrapper, NavButton } from '../../styles/NavBar'

export function NavBar() {
  return (
    <NavWrapper>
      <NavButton><NavLink to="/">Home </NavLink></NavButton>
      <NavButton><NavLink to="/about">About </NavLink></NavButton>
      <NavButton><NavLink to="/landmarks">Places </NavLink></NavButton>
      <NavButton><NavLink to="/day_planner">Plans </NavLink></NavButton>
      <NavButton><NavLink to="/profile">Profile </NavLink></NavButton>
    </NavWrapper>
  );
}