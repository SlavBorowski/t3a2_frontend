import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { BackendRequestGET, BackendRequestPUT } from '../../code_functions/BackendRequest'
import DateComparison from '../../code_functions/DateComparison'

export default function TripLogEdit(props) {
  let { trip_title, trip_id } = useParams();
  const [tripDetails, setTripDetails] = useState([]);
  const favPlaceInput = document.getElementById("favorite_place")
  const reflectionsInput = document.getElementById("reflections")

  useEffect(() => {
    BackendRequestGET(`trips/${trip_id}`, setTripDetails)
  }, [trip_id])

  useEffect(() => {
    if(DateComparison(tripDetails.date)){
      props.history.push(`/day_planner/${trip_id}/edit`)
    }
    if(favPlaceInput){
      favPlaceInput.value = tripDetails.favoriteAttraction
      reflectionsInput.value = tripDetails.reflections
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripDetails.date])

  function onFormSubmit(e) {
      e.preventDefault();
      const body =  JSON.stringify({
        trip: {
          favoriteAttraction: favPlaceInput.value,
          reflections: reflectionsInput.value
        }})
      const requestPath = "trips/" + trip_id
      BackendRequestPUT(requestPath, body)
      // redirect_to
      props.history.push(`/trip_log/${trip_title}/${trip_id}`)
  }

  return (
    <>
      <h2>{trip_title}</h2>
      <h3>Date: {tripDetails.date}</h3>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="favorite_place">Favorite Place: </label><br />
        <input type="text" name="favorite_place" id="favorite_place" />
        <br /><br />
        <label htmlFor="reflections">Reflections:</label><br />
        <textarea id="reflections" name="reflections" cols="40" rows="5"/>
        <br /><br />
        <input type="submit" value="Save Log"/>
      </form>
    </>
  );
}