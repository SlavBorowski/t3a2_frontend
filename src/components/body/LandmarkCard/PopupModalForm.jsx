import { useEffect, useState } from 'react'
import AddEditItineraryItems from '../../../code_functions/AddEditItineraryItems'

import 'reactjs-popup/dist/index.css';
import { 
  StyledPopup, 
  StyledPopupDiv,
  ModalHeading, 
  PopupButton } from '../../../styles/PopupModal';

export default function PopupModalForm(props) {
  let buttonValue = <img src={require("../../../add.svg").default} alt="delete"/>
  let titleString = "Add POI to itinerary:"
  if(props.type === "edit") {
    buttonValue = <img src={require("../../../edit.svg").default} alt="edit"/>
    titleString = "Edit POI in itinerary:"
  }

  const [time, setTime] = useState("12:00")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if(props.type === "edit") {
      setTime(props.itineraryItem.time)
      setNotes(props.itineraryItem.notes)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type])

  function onItinerarySave(e, type) {
    e.preventDefault();

    const item = { name:props.name, xid: props.xid, time:time, notes:notes}
    AddEditItineraryItems(props.itineraryItem, props.itineraryItems, props.setItineraryItems, item, type, props.setText)
  }

  function onItineraryRemove(e) {
    e.preventDefault();
    props.itineraryItems.splice(props.itineraryItems.findIndex( item => item.id === props.itineraryItem.id ), 1);
    props.setText(`Removed ${props.name} from itinerary`)
  }

  return (
    <StyledPopup
      trigger={<PopupButton>{buttonValue}</PopupButton>}
      modal
      nested
    >
      {close => (
        <>
          <ModalHeading>{props.title}</ModalHeading>
          <StyledPopupDiv className="body">
              <ModalHeading className="subheading">{titleString}</ModalHeading>

              <label htmlFor="time">Time:</label><br />
              <input type="time" name="time" id="time" value={time}
                onChange={(e) => setTime(e.target.value)}
              /><br/><br/>

              <label htmlFor="notes">Notes:</label><br />
              <textarea id="notes" name="notes" cols="40" rows="5" value={notes}
                onChange={(e) => setNotes(e.target.value)}/>
              <br /><br />

              <input type="submit" value="Save itinerary item" onClick={(e) => {
                  onItinerarySave(e, props.type)
                  close();
                }}/>
              { props.type === "edit" &&
                <input type="submit" value="Remove itinerary item" onClick={(e) => {
                  onItineraryRemove(e)
                  close();
                }}/>
              }
              <button onClick={close}>Close</button>
          </StyledPopupDiv>
        </>
      )}
    </StyledPopup>
  )
}