import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const TripCardWrapper = styled.div`
  border: solid 2px #CCC;
  border-radius: 1%;
  margin: 10px;
`;  

export const TripCardTitle = styled.h3`
  text-align: center;
  margin: 10px;
`;  

export const TripImageWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-grow: 2;
  height: 200px;
`; 

export const TripButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`; 



export const TripBodyWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`; 

export const TripButton = styled.button`
  display: block;
  color: white;
  text-decoration: none;
  background: white;
  border: solid 1px white;
  box-sizing: content-box;
  height: 30px;
  width: 30px;
  padding: 0px;

`; 

export const TripLink = styled(NavLink)`
  display: block;
  color: white;
  text-decoration: none;
  background: white;
  border: solid 1px white;
  box-sizing: content-box;
  height: 30px;
  width: 30px;
  padding: 0px; 

`; 

