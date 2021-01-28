import styled from "styled-components";
import { Link } from 'react-router-dom';

export const LocationCardsWrapper = styled.div`
  max-width: 1500px;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CardWrapper = styled(Link)`
  text-decoration: none;
  color: black;
  width: 350px;
  height: 450px;
  border: solid 2px #DDDDDD;
  border-radius: 2%;
  overflow: hidden;
  margin: 5px;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 250px;
`;

export const CardBodyWrapper = styled.div`
  padding-left: 10px;
`;

export const CardTitle = styled.h2`
  margin: 5px 0px;
`;

export const CardSubTitle = styled.h4`
  margin: 5px 0px;
`;

export const CardText = styled.p`
  margin-top: 15px;
`;