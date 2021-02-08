import { useEffect, useState } from 'react'

import { 
  TripCardWrapper, 
  TripCardTitle, 
  TripImageWrapper,
  TripBodyWrapper,
  TripButtonWrapper,
  TripButton,
  TripLink } from '../../styles/TripCard'
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
        if((Math.floor((window.innerWidth-200)/200)) !== 0){
          arr = arr.filter((item, index) => index < (Math.floor((window.innerWidth-200)/200))) // Limits number of images displayed by window width
        } else {
          arr = arr.filter((item, index) => index < 1)
        }
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
                  POI_id={landmark.POI_id}
                  className="image_only"/>
              )}
            </TripImageWrapper> 
            <TripButtonWrapper> 
              <TripLink to={`/trip_log/${props.trip.title}/${props.trip.id}`}><img src={require("../../show.svg").default} alt="show"/></TripLink>
              <TripLink to={`/trip_log/${props.trip.title}/${props.trip.id}/edit`}><img src={require("../../edit.svg").default} alt="edit"/></TripLink>
              <TripButton onClick={() => onDeleteTripClick()}><img src={require("../../delete.svg").default} alt="delete"/></TripButton>
          </TripButtonWrapper>
          </TripBodyWrapper>
        </TripCardWrapper>
      }
    </>
  );
}