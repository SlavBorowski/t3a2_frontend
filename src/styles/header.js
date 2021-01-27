import styled from 'styled-components';

export const BannerWrapper = styled.div`
  border: solid 0.1px white;
  height: 200px;
  background-image: url("/banner.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  color: white;

`;


export const BannerText = styled.h1`
  background: rgba(0, 0, 0, 0.4);
  border: solid 2px white;
  width: 400px;
  margin: 70px auto;
  padding: 15px;

  @media (max-width: 530px) {
    margin: 45px auto;
    width: 60%;
  }

  @media (max-width: 400px) {
    margin: 45px auto;
    width: 220px;
  }
`;