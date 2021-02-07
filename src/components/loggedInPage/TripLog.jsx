import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { PhotoCard } from '../body/PhotoCard';
import { 
  BackendRequestGET } from '../../code_functions/BackendRequest'
import { TripLink, TripButton } from '../../styles/TripLog'


export function TripLog() {
  let { trip_title, trip_id } = useParams();
  const [itineraryItems, setItineraryItems] = useState([]);
  const [tripDetails, setTripDetails] = useState([]);

  useEffect(() => {
    BackendRequestGET(`trips/${trip_id}`, setTripDetails)
    BackendRequestGET(`${trip_id}/itinerary`, setItineraryItems)
    // console.log(tripDetails)
  }, [trip_id])

  return (
    <>
      <h2>{trip_title}</h2>
      <h3>Date: {tripDetails.date}</h3>
      <h3>Favorite Place: {tripDetails.favoriteAttraction}</h3>
      <h3>Reflections:</h3>
      <p>
      {tripDetails.reflections} <br />
        Place Holder Text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Suspendisse elit metus, efficitur sagittis pretium sit amet
      </p>

      <TripLink to={`/trip_log/${trip_title}/${trip_id}/edit`}>Edit</TripLink>
      <TripButton>Delete</TripButton>
      <h3>Trip Itinerary Items</h3>
      <p>Please click on items to see gallery and/or upload photos</p>
      {itineraryItems && itineraryItems.map((item, index) =>
        <PhotoCard key={index} item={item} index={index}/>
      )}
    </>
  );
}