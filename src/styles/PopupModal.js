import styled from 'styled-components';
import Popup from 'reactjs-popup';

export const StyledPopup = styled(Popup)`
  // use your custom style for ".popup-content"
  &-content {
    @media (max-width: 700px) {
      width:80%;
    }
  }
`;

export const StyledPopupDiv = styled.div`
  &.header {
    display: flex;
    justify-content: space-between;
  }

  &.body{
    display: inline-block;
    margin: 20px;
  }

  &.image_wrapper{
    margin: -20px -10px;
    float: left;
  }
`;

export const ModalCloseButton = styled.button`
  width: 25px;
  height: 25px;
  margin: 20px 20px 0px 20px;
`;

export const ModalHeading = styled.h3`
  margin: 20px 20px 0px 20px;
  &.subheading { margin: 0px 0px 10px 0px; }
`;

export const PopupButton = styled.button`
  color: white;
  background: black;
  border: solid 1px white;
  height: 25px;
  width: 25px;
  margin: 0px;
  
`;


// .popup-content{margin:auto;background:#fff;width:50%;padding:5px;border:1px solid #d7d7d7}
// [role=tooltip].popup-content{width:200px;box-shadow:0 0 3px rgba(0,0,0,.16);border-radius:5px}.popup-overlay{background:rgba(0,0,0,.5)}
// [data-popup=tooltip].popup-overlay{background:transparent}.popup-arrow{-webkit-filter:drop-shadow(0 -3px 3px rgba(0,0,0,.16));filter:drop-shadow(0 -3px 3px rgba(0,0,0,.16));color:#fff;stroke-width:2px;stroke:#d7d7d7;stroke-dasharray:30px;stroke-dashoffset:-54px}



