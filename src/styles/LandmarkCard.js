import styled from "styled-components";

export const StyledLandmarkCard = styled.div`
  display: flex;
  justify-content: space-even;
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

  &.small {
    height: 110px;

    @media (max-width: 420px) {
      height: 270px;
    }
  }

  &.image_only {
    display: inline;
    width: auto;
    height: auto;
    border: none;
  }
`;

export const CardComponents = styled.div`
  &.image {
    display: inline-block;
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
  }

  &.button_wrapper {
    display: none;
  }

  &.text {
    font-size: 18px;
  }

  &.body {
    flex-grow: 2;
    height: 180px;
    overflow: hidden;
    margin: 20px;
  }

  &.title {
    font-size: 24px;
    font-weight: bold;
    margin: 5px 0px;
  }

  &.button {
    display: none;
  }


  .small & {
    &.image {
      min-width: 90px;
      width: 90px;
      height: 90px;
      margin: 9px;
    }

    &.button_wrapper {
      display: block;
      width: 25px;
      margin: 10px;
    }

    &.text {
      margin: 5px 0px;
      font-weight: normal;
      font-size: 16px;
    }

    &.body {
      height: 90px;
      margin: 5px 20px;
    }

    &.title {
      font-size: 20px;
    }
  }

  .itinerary & {
    &.button {
      display: block;
    }
  }

  .image_only & {

    &.image {
      margin: 0px;
    }
    
    &.body {
      display: none;
    }
    &.button_wrapper {
      display: none;
    }
  }
`