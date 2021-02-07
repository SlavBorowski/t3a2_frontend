import { useEffect, useState } from 'react'
import {NavLink} from "react-router-dom";
import { 
  TripCardWrapper, 
  TripCardTitle, 
  TripImageWrapper,
  TripBodyWrapper,
  TripButtonWrapper,
  TripButton } from '../../styles/TripCard'

import LandmarkCard from './LandmarkCard/LandmarkCard'
import CompareTime from '../../code_functions/CompareTime'
import { BackendRequestDELETE } from '../../code_functions/BackendRequest'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function TripCard(props) {

  const [itineraryItems, setItineraryItems] = useState();
  const [present, setPresent] = useState(true);

  useEffect(() => {
    if(present){
      setTimeout(() => {
        let arr = props.itineraryItems.filter((item) => item.trip_id === props.trip.id)
        arr = arr.filter((item, index) => index < (Math.floor((window.innerWidth-200)/200))) // Limits number of images displayed by window width
        setItineraryItems(arr.sort( CompareTime ));
      }, (1600*props.index));
    }
  }, [props.itineraryItems, props.index, props.trip.id, present])

  // Deletes trip after confirm
  function onDeleteTripClick() {
    if (window.confirm("Would you like to delete this trip?")) {
      BackendRequestDELETE(`trips/${props.trip.id}`)
      setPresent(false)
    }
  }

  return (
    <>
      {present &&
        <TripCardWrapper>
          <TripCardTitle>{props.trip.title} - {props.trip.date}, {capitalizeFirstLetter(props.trip.city)}</TripCardTitle>
          <TripBodyWrapper>
            <TripImageWrapper>
              {itineraryItems && itineraryItems.map((landmark) => 
                <LandmarkCard 
                  key={landmark.name} 
                  name={landmark.name}
                  xid={landmark.POI_id}
                  className="image_only"/>
              )}
            </TripImageWrapper> 
            <TripButtonWrapper> 
              <TripButton><NavLink to={`/trip_log/${props.trip.title}/${props.trip.id}`}>Show</NavLink></TripButton>
              <TripButton><NavLink to={`/trip_log/${props.trip.title}/${props.trip.id}/edit`}>Edit</NavLink></TripButton>
              <TripButton onClick={() => onDeleteTripClick()}>Dele</TripButton>

            </TripButtonWrapper>
          </TripBodyWrapper>
        </TripCardWrapper>
      }
    </>
  );
}