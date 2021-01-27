import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 220px;
  border: solid 2px #DDDDDD;
  border-radius: 1%;
  overflow: hidden;
  margin: 5px 0px;

  @media (max-width: 420px) {
    display: block;
    height: 400px;
  }
`;

export const ThumbnailImage = styled.div`
  background-image: url("${(props) => props.src}");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 180px;
  width: 180px;
  height: 180px;
  border: solid 2px #DDDDDD;
  border-radius: 4%;
  margin: 20px;

  @media (max-width: 500px) {
    min-width: 36vw;
    height: 36vw;
  }

  @media (max-width: 420px) {
    width: 80%;
    height: 140px;
  }
`;

export const CardBody = styled.div`
  height: 180px;
  overflow: hidden;
  margin: 20px;
`;

export const CardTitle = styled.h2`
  margin: 5px 0px;
`;
