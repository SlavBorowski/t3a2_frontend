import styled from "styled-components";

export const LocationCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CardWrapper = styled.div`
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