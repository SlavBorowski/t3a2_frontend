import {NavLink} from "react-router-dom";
import { NavWrapper, NavButton } from '../../styles/NavBar'

export function NavBar() {
  return (
    <NavWrapper>
      <NavButton to="/">Home </NavButton>
      <NavButton to="/about">About </NavButton>
      <NavButton to="/landmarks/Paris">Places </NavButton>
      <NavButton to="/day_planner">Plans </NavButton>
      <NavButton to="/profile">Profile </NavButton>
    </NavWrapper>
  );
}