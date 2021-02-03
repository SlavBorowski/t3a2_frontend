import { DetailsButton } from '../../../styles/SmallLandmarkCard';
import { ThumbnailImage } from '../../../styles/LandmarkCard'
import { StyledPopup, ModalBox, ModalHeader, ModalCloseButton, ModalHeading, ModalSubHeading, ModalImageWrapper, ModalContent } from '../../../styles/PopupModal';
import 'reactjs-popup/dist/index.css';

export function PopupModal(props) {
  let buttonValue = "Details"
  if(props.type === "add_edit") buttonValue = "Add/Edit"

  function onItinerarySave(e) {
    e.preventDefault();
  }

  return (
    <StyledPopup
          trigger={<DetailsButton>{buttonValue}</DetailsButton>}
          modal
          nested
        >
          {close => (
            <ModalBox>
              <ModalHeader>
                <ModalHeading>{props.title}</ModalHeading>
                {props.type === "details" && <ModalCloseButton onClick={close}>&times;</ModalCloseButton>}
              </ModalHeader>
              
              <ModalContent>
                {props.type === "details" ?
                <>
                  <ModalImageWrapper>
                    <ThumbnailImage src={props.img_src}/>
                  </ModalImageWrapper>
                  {props.content}
                </>:
                <>
                  <ModalSubHeading>Add/Edit POI to itinerary:</ModalSubHeading>
                  <form onSubmit={onItinerarySave} >
                    <label htmlFor="title">Time:</label><br />
                    <input
                      type="time"
                      name="time"
                      id="time"
                    /><br/><br/>
                    <label htmlFor="title">Notes:</label><br />
                    <textarea id="notes" name="notes" cols="40" rows="5"/>
                    <br /><br />
                    <input type="submit" value="Save to itinerary"/>
                  </form>
                  <br />
                  <button>Remove from itinerary</button>
                  <button onClick={close}>Cancel</button>
                </>

                }
                
              </ModalContent>

            </ModalBox>
          )}
        </StyledPopup>
  )
}