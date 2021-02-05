import { StyledLandmarkCard, CardComponents } from '../../../styles/LandmarkCard'

import { useEffect, useState} from 'react';
import { detailedLandmarkFetch } from '../../../api_open_trip_map/detailedLandmarkFetch'
import PopupModalForm from './PopupModalForm'
import PopupModalInfo from './PopupModalInfo'
import LandmarkPopup from './LandmarkPopup'

export function LandmarkCard(props) {
  const [landmarkDescription, setLandmarkDescription] = useState();
  const [landmarkImageSrc, setLandmarkImageSrc] = useState();
  const [addEditType, setAddEditType] = useState("add");

  // Runs on ComponentDidMount once and will set the landmark image/description
  useEffect(() => {
    props.className === "small itinerary" ? setAddEditType("edit") : setAddEditType("add")
    detailedLandmarkFetch(props.xid, setLandmarkImageSrc, setLandmarkDescription)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.xid]);

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
              xid={props.xid}
              setItineraryItems={props.setItineraryItems}
              itineraryItems={props.itineraryItems}
              setText={props.setText}
            />
          </CardComponents>

        </StyledLandmarkCard>
  );
}
