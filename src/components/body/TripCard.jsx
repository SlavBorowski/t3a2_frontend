import { useEffect, useState } from 'react'
import { 
  TripCardWrapper, 
  TripCardTitle, 
  TripImageWrapper,
  TripBodyWrapper,
  TripButtonWrapper,
  TripButton } from '../../styles/TripCard'

import LandmarkCard from './LandmarkCard/LandmarkCard'
import CompareTime from '../../code_functions/CompareTime'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function TripCard(props) {

  const [itineraryItems, setItineraryItems] = useState();

  useEffect(() => {
    setTimeout(() => {
      let arr = props.itineraryItems.filter((item) => item.trip_id === props.trip.id)
      arr = arr.filter((item, index) => index < 5) // Limits number of images displayed to 5
      setItineraryItems(arr.sort( CompareTime ));
    }, (1600*props.index));
  }, [props.itineraryItems, props.index, props.trip.id])

  

  return (
    <>
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
            <TripButton>Show</TripButton>
            <TripButton>Edit</TripButton>
            <TripButton>Dele</TripButton>
          </TripButtonWrapper>
        </TripBodyWrapper>
    </TripCardWrapper>
    </>
  );
}