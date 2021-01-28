import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  border: solid 2px black;
  background: black;
  height: 40px;
  align-items: center;
`;


export const NavButton = styled(NavLink)`
  width: 75px;
  display: flex;
  font-size: large;
  text-align: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  border: solid 1px white;
  padding: 7px 5px;
  
`;
