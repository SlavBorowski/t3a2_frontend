import styled from 'styled-components';

export const BannerWrapper = styled.div`
  border: solid 0.1px white;
  height: 300px;
  background-image: url("/banner.jpg");
  background-position: top-center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  color: white;
`;


export const BannerText = styled.h1`
  background: rgba(0, 0, 0, 0.4);
  border: solid 2px white;
  width: 30%;
  margin: 120px auto;
  padding: 15px;
`;