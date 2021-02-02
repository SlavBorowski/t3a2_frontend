import styled from "styled-components";

export const SmallLandmarkCard = styled.div`
  display: flex;
  width: 100%;
  height: 110px;
  border: solid 2px #DDDDDD;
  border-radius: 1%;
  overflow: hidden;
  margin: 5px 0px;

  @media (max-width: 420px) {
    display: block;
    height: 400px;
}
`;

export const SmallThumbnailImage = styled.div`
  background-image: url("${(props) => props.src}");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 90px;
  width: 90px;
  height: 90px;
  border: solid 2px #DDDDDD;
  border-radius: 4%;
  margin: 9px;

  @media (max-width: 500px) {
    min-width: 36vw;
    height: 36vw;
  }

  @media (max-width: 420px) {
    width: 80%;
    height: 140px;
  }
`;

export const SmallCardBody = styled.div`
  height: 90px;
  overflow: hidden;
  margin: 5px 20px;
`;

export const SmallCardTitle = styled.h2`
  margin: 5px 0px;
  font-size: 20px;
`;

export const SmallCardText = styled.p`
  margin: 5px 0px;
`;