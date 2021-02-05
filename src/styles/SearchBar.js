import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const NavButton = styled(NavLink)`
  width: 75px;
  font-size: large;
  text-align: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  border: solid 1px white;
  padding: 7px 5px;
  background: black;
  position: relative;
  top: 2px;
`;

export const SearchInput = styled.input`
  width: 250px;
  height: 31px;
`;