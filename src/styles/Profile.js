import styled from "styled-components";

export const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 770px) {
    display: block;
    height: 600px;
  }

  @media (max-width: 500px) {
    height: 350px;
  }
`;

export const InfoWrapper = styled.div`
  width: 20%;

  @media (max-width: 930px) {
    width: 100%;
  }
`;

export const BioWrapper = styled.div`
  width: 50%;

  @media (max-width: 930px) {
    width: 100%;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

export const ImageWrapper = styled.div`
  width: 25%;
  
  @media (max-width: 930px) {
    width: 100%;
  }
`;

export const ProfileButton = styled.button`
  color: white;
  background: black;
  border: solid 1px white;
  margin: 10px 5px;
  height: 25px;
`;

export const ProfileTitle = styled.h2`
font-size: 40px;
text-align: center;
`;

export const PageWrapper= styled.div`
  margin: 0px 40px;

  @media (max-width: 930px) {
    margin: 0px 20px;
  }

  @media (max-width: 500px) {
    margin: 0px 10px;
  }
`;

