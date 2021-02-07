import {useHistory, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import SaveTrip from '../../code_functions/SaveTrip';
import { landmarksSearch } from '../../api_open_trip_map/landmarksSearch';
import LandmarkCard from './LandmarkCard/LandmarkCard'

import {
  PlanWrapper, 
  ItineraryWrapper,
  PlannerInput} from '../../styles/DayPlanner'
  import { BackendRequestGET} from '../../code_functions/BackendRequest'
  import CompareTime from '../../code_functions/CompareTime'

export default function DayPlannerForm(props) {

  const [city, setCity] = useState("");
  const [existingItinerary, setExistingItinerary] = useState("");
  const history = useHistory();
  let { trip_id } = useParams();
  const [tripDetails, setTripDetails] = useState({});
  const today = new Date().toISOString().slice(0, 10)

  //If in edit mode, load the current trip values
  useEffect(()=> {
    if(trip_id) BackendRequestGET(`trips/${trip_id}`, setTripDetails) 
  }, [trip_id])

  useEffect(()=> {
    if(tripDetails.id) {
      document.getElementById("title").value = tripDetails.title
      document.getElementById("date").value = tripDetails.date
      setCity(tripDetails.city)
      BackendRequestGET(`${tripDetails.id}/itinerary`, setExistingItinerary)
    } else {
      document.getElementById("title").value = ""
      document.getElementById("date").value = today
    }
  }, [tripDetails, today])

  useEffect(() => {
    if(existingItinerary){
      for (const item of existingItinerary) {
        delete item.created_at
        delete item.updated_at
        delete item.trip_id
        delete item.id
      }
      setExistingItinerary(existingItinerary.sort( CompareTime ))
      props.setItineraryItems(existingItinerary)
      
      if(props.itineraryItems.length > 0){
        props.setText("Archived Itinerary Items Loaded")
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingItinerary, props.itineraryItems])


  function onSearchLocation(e){
    if(e) {
      e.preventDefault()
      if(e.target.city.value !== "") {
        setCity(e.target.city.value)
        landmarksSearch(e.target.city.value)
        .then(position => props.setLocationPos(position))
      }else {
        landmarksSearch(city)
        .then(position => props.setLocationPos(position))
      }
    }
  }

  // Saves trip information to rails server database
  function onSaveTrip(e){
    e.preventDefault()
    const title = document.getElementById("title").value
    const date = document.getElementById("date").value
    const trip_body = JSON.stringify({ trip: { title, date, city } })
    
    SaveTrip(trip_body, title, props.itineraryItems, trip_id) 
    setTimeout(() => {
      history.push("/profile")
    }, (300));
  }

  // onSearchLocation is triggered when the city search form is submitted
  // UseEffect is used to ensure that the effects keep triggering until the correct values are set
  useEffect(() => {
    onSearchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.count])

  return (
    <PlanWrapper>
      <form onSubmit={onSearchLocation}>
        <label htmlFor="city">City: </label>
        <input type="text" name="city" id="city" 
          placeholder={tripDetails.city || "Please enter a destination..."}/>

        <PlannerInput type="submit" value="Search" />
      </form><br/>  

      <form onSubmit={onSaveTrip}>
        <label htmlFor="title">Title:</label>
        <input type="title" name="title" id="title" />
        <br/><br/>

        <label htmlFor="date">Date:</label>
        <input type="date" name="date" id="date" 
          min="2021-01-01" max="2023-12-31"/>
        <br/><br/>

        <PlannerInput type="submit" value="Save Trip" />
        <span>Warning: trips with same title will be overwritten</span>
      </form>
      
      <h3>Itinerary: </h3>
      <ItineraryWrapper>
        {props.itineraryItems && props.itineraryItems.map((itineraryItem) =>
          <LandmarkCard 
            key={itineraryItem.name  + itineraryItem.id} 
            itineraryItem={itineraryItem}
            name={itineraryItem.name}
            POI_id={itineraryItem.POI_id}
            className="small itinerary"
            setItineraryItems={props.setItineraryItems}
            itineraryItems={props.itineraryItems}
            setText={props.setText}/>
        )}
      </ItineraryWrapper>
      <br/> 
      {props.text}

    </PlanWrapper>
  )
}