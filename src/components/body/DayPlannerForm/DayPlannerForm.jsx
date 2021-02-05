import {useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react';
import SaveTrip from '../../../code_functions/SaveTrip';
import { landmarksSearch } from '../../../api_open_trip_map/landmarksSearch';
import LandmarkCard from '../../body/LandmarkCard/LandmarkCard'

import {
  PlanWrapper, 
  ItineraryWrapper,
  PlannerInput} from '../../../styles/DayPlanner'

export default function DayPlannerForm(props) {

  const [date, setDate] = useState("2021-02-04");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const history = useHistory();

  function onSearchLocation(e){
    if(e) {
      e.preventDefault()
      setCity(e.target.city.value)
      landmarksSearch(e.target.city.value)
      .then(position => props.setLocationPos(position))
    }
  }

  // Saves trip information to rails server database
  function onSaveTrip(e){
    e.preventDefault()
    SaveTrip(title, date, city, props.itineraryItems) 
    history.push("/profile")
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
          placeholder="Please enter a destination..." />

        <PlannerInput type="submit" value="Search" />
      </form><br/>  

      <form onSubmit={onSaveTrip}>
        <label htmlFor="title">Title:</label>
        <input type="title" name="title" id="title" value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br/><br/>

        <label htmlFor="date">Date:</label>
        <input type="date" name="date" id="date" 
          min="2021-01-01" max="2023-12-31" value={date}
          onChange={(e) => setDate(e.target.value)}
        /><br/><br/>

        <PlannerInput type="submit" value="Save Trip" />
      </form>

      <h3>Itinerary: </h3>
      <ItineraryWrapper>
        {props.itineraryItems && props.itineraryItems.map((itineraryItem) =>
          <LandmarkCard 
            key={itineraryItem.name  + itineraryItem.id} 
            itineraryItem={itineraryItem}
            name={itineraryItem.name}
            xid={itineraryItem.xid}
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