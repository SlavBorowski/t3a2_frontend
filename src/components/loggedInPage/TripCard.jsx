import { useEffect, useState } from 'react'
import { 
  ItineraryCardWrapper, 
  ItineraryCardTitle, 
  ItineraryImageWrapper,
  ItineraryBodyWrapper,
  ItineraryButtonWrapper,
  TripButton } from '../../styles/ItineraryCard'

import LandmarkCard from '../body/LandmarkCard/LandmarkCard'
import CompareTime from '../../code_functions/CompareTime'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function TripCard(props) {

  const [itineraryItems, setItineraryItems] = useState();

  useEffect(() => {
    setTimeout(() => {
      const arr = props.itineraryItems.filter(item => item.trip_id === props.trip.id)
      setItineraryItems(arr.sort( CompareTime ));
    }, (1600*props.index));
  }, [props.itineraryItems, props.index, props.trip.id])

  

  return (
    <>
    <ItineraryCardWrapper>
      <ItineraryCardTitle>{props.trip.title} - {props.trip.date}, {capitalizeFirstLetter(props.trip.city)}</ItineraryCardTitle>
        <ItineraryBodyWrapper>
          <ItineraryImageWrapper>
            {itineraryItems && itineraryItems.map((landmark) => 
              <LandmarkCard 
                key={landmark.name} 
                name={landmark.name}
                xid={landmark.POI_id}
                className="image_only"/>
            )}
          </ItineraryImageWrapper> 
          <ItineraryButtonWrapper> 
            <TripButton>Show</TripButton>
            <TripButton>Edit</TripButton>
            <TripButton>Dele</TripButton>
          </ItineraryButtonWrapper>
        </ItineraryBodyWrapper>
    </ItineraryCardWrapper>
    </>
  );
}