import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const PlanWrapper = styled.div`
  max-width: 40%;
  padding: 25px 20px;
  font-size: large;

  @media (max-width: 500px) {
    max-width: 100%;
  }
`;

export const LandmarkWrapper = styled.div`
  padding: 0px 4px;
  max-height: 500px;
  overflow-y: scroll;
  border: solid 2px #CCC;
  border-radius: 1%;
`;

export const ItineraryWrapper = styled.div`
  padding: 0px 4px;
  max-height: 320px;
  overflow-y: scroll;
  border: solid 2px #CCC;
  border-radius: 1%;
`;

export const Title = styled.h2`
  font-size: 40px;
  text-align: center;
`;

export const PlannerInput = styled.input`
  color: white;
  background: black;
  border: solid 1px white;
  height: 23px;
  margin: 0px 5px;
  
`;

export const LocationContainer = styled.div`
  max-width: 50%;  

  @media (max-width: 500px) {
    max-width: 100%;
  }
`;

export const LocationHeader = styled.h2`
padding: 0px 20px;
`;

