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
  if(props.type === "add") buttonValue = "Add"
  if(props.type === "edit") buttonValue = "Edit"

  const [time, setTime] = useState("12:00")
  const [notes, setNotes] = useState("")

  function onItinerarySave(e, type) {
    e.preventDefault();
    let itemId = props.itineraryItems.length;
    if(type === "edit") {
      props.itineraryItems.splice(props.itineraryItems.findIndex( item => item.id === props.id ), 1);
      itemId = props.id
    }

    props.itineraryItems.push(
      {
        "id": itemId,
        "name": props.name,
        "xid": props.xid,
        "time": time,
        "notes": notes
      }
    )
    props.itineraryItems.sort( CompareTime );
    props.setItineraryItems(props.itineraryItems)
    if(type === "add") props.setText(`You're visiting ${props.itineraryItems.length} landmarks today`)
    if(type === "edit") props.setText(`Visiting ${props.name} is now set to ${time}`)
    // console.log(props.itineraryItems)
  }

  function onItineraryRemove(e) {
    e.preventDefault();
      props.itineraryItems.splice(props.itineraryItems.findIndex( item => item.id === props.id ), 1);
      props.setText(`Removed ${props.name} from itinerary`)
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
              { props.type === "edit" ? 
              <>
                <input type="submit" value="Edit itinerary item" onClick={(e) => {
                  onItinerarySave(e, "edit")
                  close();
                }}/>
                <input type="submit" value="Remove itinerary item" onClick={(e) => {
                  onItineraryRemove(e)
                  close();
                }}/>
              </>
              :
              <input type="submit" value="Add itinerary item" onClick={(e) => {
                onItinerarySave(e, "add")
                close();
              }}/>}
              <button onClick={close}>Close</button>
            </>
            }
          </ModalContent>
        </ModalBox>
      )}
    </StyledPopup>
  )
}