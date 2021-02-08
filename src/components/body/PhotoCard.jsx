// import { useEffect, useState } from 'react'
import {NavLink} from "react-router-dom";
import { 
  TripCardWrapper, 
  TripCardTitle, 
  TripBodyWrapper } from '../../styles/TripCard'

// import LandmarkCard from './LandmarkCard/LandmarkCard'
// import CompareTime from '../../code_functions/CompareTime'

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

export function PhotoCard(props) {

  // const [itineraryItems, setItineraryItems] = useState();

  // useEffect(() => {
  //   setTimeout(() => {
  //     let arr = props.itineraryItems.filter((item) => item.trip_id === props.trip.id)
  //     arr = arr.filter((item, index) => index < (Math.floor((window.innerWidth-200)/200))) // Limits number of images displayed by window width
  //     setItineraryItems(arr.sort( CompareTime ));
  //   }, (1600*props.index));
  // }, [props.itineraryItems, props.index, props.trip.id])

  

  return (
    <NavLink to={`/private_gallery/${props.tripDetails.city}/${props.item.name}`}>
      <TripCardWrapper>
        <TripCardTitle>{props.item.time} - {props.item.name}</TripCardTitle>
          <TripBodyWrapper>
              {/* {itineraryItems && itineraryItems.map((landmark) => 
                <LandmarkCard 
                  key={landmark.name} 
                  name={landmark.name}
                  xid={landmark.POI_id}
                  className="image_only"/>
              )} */}
          </TripBodyWrapper>
      </TripCardWrapper>
    </NavLink>
  );
}