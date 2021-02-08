import { StyledLandmarkCard, CardComponents } from '../../../styles/LandmarkCard'

import { useEffect, useState} from 'react';
import { detailedLandmarkFetch } from '../../../api_open_trip_map/detailedLandmarkFetch'
import PopupModalForm from './PopupModalForm'
import PopupModalInfo from './PopupModalInfo'
import LandmarkPopup from './LandmarkPopup'

export default function LandmarkCard(props) {
  const [landmarkDescription, setLandmarkDescription] = useState();
  const [landmarkImageSrc, setLandmarkImageSrc] = useState();
  const [addEditType, setAddEditType] = useState("add");

  // Runs on ComponentDidMount once and will set the landmark image/description
  useEffect(() => {
    props.className === "small itinerary" ? setAddEditType("edit") : setAddEditType("add")
    detailedLandmarkFetch(props.POI_id, setLandmarkImageSrc, setLandmarkDescription)
    // console.log(props.POI_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.POI_id]);

  function onDeleteItineraryItemClick(e) {
    e.preventDefault();
    props.itineraryItems.splice(props.itineraryItems.findIndex( item => item.POI_id === props.itineraryItem.POI_id ), 1);
    props.setText(`Removed ${props.name} from itinerary`)
  }

  return (
        <StyledLandmarkCard className={props.className}>

          <CardComponents className="image" src={landmarkImageSrc}/>

          <CardComponents className="body">
            <CardComponents className="title">{props.className === "small itinerary" && props.itineraryItem.time}</CardComponents>
            <CardComponents className="title">{props.name}</CardComponents>
            <CardComponents className="text" >{landmarkDescription}</CardComponents>
          </CardComponents>

          <CardComponents className="button_wrapper">
            <PopupModalInfo
              title={props.name}
              content={landmarkDescription}
              img_src={landmarkImageSrc}
            />
            <PopupModalForm
              type={addEditType}
              title={
              <LandmarkPopup 
                name={props.name}
                landmarkImageSrc={landmarkImageSrc}
                landmarkDescription={landmarkDescription}/>}
              itineraryItem={props.itineraryItem}
              name={props.name}
              POI_id={props.POI_id}
              setItineraryItems={props.setItineraryItems}
              itineraryItems={props.itineraryItems}
              setText={props.setText}
            />
            <CardComponents className="button" onClick={(e) => onDeleteItineraryItemClick(e)}><img src={require("../../../delete.svg").default} alt="delete"/>
            </CardComponents>
          </CardComponents>

        </StyledLandmarkCard>
  );
}
