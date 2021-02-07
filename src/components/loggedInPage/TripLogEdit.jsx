import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { BackendRequestGET, BackendRequestPUT } from '../../code_functions/BackendRequest'
import DateComparison from '../../code_functions/DateComparison'

export default function TripLogEdit(props) {
  let { trip_title, trip_id } = useParams();
  const [tripDetails, setTripDetails] = useState([]);
  const [favPlace, setFavPlace] = useState("");
  const [reflections, setReflections] = useState("");

  useEffect(() => {
    BackendRequestGET(`trips/${trip_id}`, setTripDetails)
    // console.log(tripDetails)
  }, [trip_id])

  useEffect(() => {
    if(DateComparison(tripDetails.date)){
      props.history.push(`/day_planner/${trip_id}/edit`)
    }
  }, [tripDetails.date, props.history])

  function onFormSubmit(e) {
      e.preventDefault();
      const body =  JSON.stringify({
        trip: {
          favoriteAttraction: favPlace,
          reflections: reflections
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
        <input type="text" name="favorite_place" id="favorite_place" value={favPlace}
        onChange={(e) => setFavPlace(e.target.value)}/>
        <br /><br />
        <label htmlFor="reflections">Reflections:</label><br />
        <textarea id="reflections" name="reflections" cols="40" rows="5" value={reflections}
        onChange={(e) => setReflections(e.target.value)}/>
        <br /><br />
        <input type="submit" value="Save Log"/>
      </form>
    </>
  );
}