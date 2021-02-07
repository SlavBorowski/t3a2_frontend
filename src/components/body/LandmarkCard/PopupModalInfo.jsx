import { CardComponents } from '../../../styles/LandmarkCard'
import 'reactjs-popup/dist/index.css';
import { 
  StyledPopup, 
  StyledPopupDiv,
  ModalCloseButton, 
  ModalHeading, 
  PopupButton } from '../../../styles/PopupModal';

export default function PopupModalInfo(props) {
  return (
    <StyledPopup
      trigger={<PopupButton><img src={require("../../../show.svg").default} alt="view"/></PopupButton>}
      modal
      nested
    >
      {close => (
        <>
          <StyledPopupDiv className="header">
            <ModalHeading>{props.title}</ModalHeading>
            <ModalCloseButton onClick={close}>&times;</ModalCloseButton>
          </StyledPopupDiv>

          <StyledPopupDiv className="body">
              <StyledPopupDiv className="image_wrapper">
                <CardComponents className="image" src={props.img_src}/>
              </StyledPopupDiv>
              {props.content}
          </StyledPopupDiv>
        </>
      )}
    </StyledPopup>
  )
}