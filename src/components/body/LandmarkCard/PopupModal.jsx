import { useState } from 'react'
import CompareTime from '../../../code_functions/CompareTime'

import { DetailsButton } from '../../../styles/SmallLandmarkCard';
import { ThumbnailImage } from '../../../styles/LandmarkCard'
import 'reactjs-popup/dist/index.css';
import { 
  StyledPopup, 
  ModalBox, 
  ModalHeader,
  ModalCloseButton, 
  ModalHeading, 
  ModalSubHeading, 
  ModalImageWrapper, 
  ModalContent } from '../../../styles/PopupModal';

export function PopupModal(props) {
  let buttonValue = "Details"
  if(props.type === "add_edit") buttonValue = "Add/Edit"

  const [time, setTime] = useState("12:00")
  const [notes, setNotes] = useState("")

  function onItinerarySave(e) {
    e.preventDefault();
    // console.log(time)
    props.itineraryItems.push(
      {
        "name": props.name,
        "xid": props.xid,
        "time": time,
        "notes": notes
      }
    )
    props.itineraryItems.sort( CompareTime );
    props.setItineraryItems(props.itineraryItems)
    props.setText(`You're visiting ${props.itineraryItems.length} landmarks today`)
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
              <form >
                <label htmlFor="time">Time:</label><br />
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                /><br/><br/>
                <label htmlFor="notes">Notes:</label><br />
                <textarea 
                  id="notes" 
                  name="notes" 
                  cols="40" 
                  rows="5"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}/>
                <br /><br />
                <input type="submit" value="Save to itinerary" onClick={(e) => {
                  onItinerarySave(e)
                  close();
                }}/>
              </form>
              <br />
              <button>Remove from itinerary</button>
              <button onClick={close}>Close</button>
            </>
            }
          </ModalContent>
        </ModalBox>
      )}
    </StyledPopup>
  )
}