
import {
  PageWrapper, 
  PlanWrapper, 
  LandmarkWrapper, 
  ItineraryWrapper,
  Title,
  PlannerInput,
  LocationContainer, 
  LocationHeader} from '../../styles/DayPlanner.js'

import { useEffect, useState } from 'react';
import { LandmarkListFooter, ListButton } from '../../styles/App';
import { LandmarkCard } from '../body/LandmarkCard/LandmarkCard'

import { SetLandmarkListFooter } from '../../code_functions/SetLandmarkListFooter'
import { landmarksSearch, radiusCountSearch, loadList} from '../../api_open_trip_map/landmarksSearch'

export function DayPlanner(props) {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("2021-02-04");
  const [title, setTitle] = useState("");
  const [locationPos, setLocationPos] = useState([0,0]);
  const [landmarks, setLandmarks] = useState();
  const [itineraryItems, setItineraryItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const pageLength = 5;

  //Text is used to update DOM when new itinerary items are pushed, do not remove
  const [text, setText] = useState("Please add landmarks to itinerary");

  // Saves trip information to rails server database
  async function onSaveTrip(e){
    e.preventDefault()
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/trips`, {
          method: "POST",
          headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`},
          body: JSON.stringify({ trip: { title, date, city } })
        });
        if (response.status >= 400) {
          throw new Error("incorrect credentials");
        } else { 
          // console.log("Trip Saved")
          itineraryItems.map(async function itineraryPost(item) {
            const name = item.name
            const POI_id = item.xid
            const time = item.time
            const notes = item.notes
      
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/${title}/itinerary`, {
              method: "POST",
              headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`},
              body: JSON.stringify({ itinerary_item: { name, POI_id, time, notes } })
            })
            // console.log("Itinerary Item Saved")
          })
        }
      } catch (err) {
        console.log(err.message);
      }
  }

  // onSearchLocation is triggered when the city search form is submitted
  // UseEffect is used to ensure that the effects keep triggering until the correct values are set
  useEffect(() => {
    onSearchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  function onSearchLocation(e){
    if(e) {
      e.preventDefault()
      setCity(e.target.city.value)
      landmarksSearch(e.target.city.value)
      .then(position => setLocationPos(position))
    }
  }

  // Set the count after locationPos values set
  useEffect(() => {
    radiusCountSearch(locationPos)
    .then(num => setCount(num))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationPos]);

  // Update list load with updates to locationPos and offset
  useEffect(() => {
    loadList(locationPos, pageLength, offset, true)
    .then(landmarkItemArr => setLandmarks(landmarkItemArr))

    SetLandmarkListFooter(offset, pageLength, count)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationPos, offset, count]);
  
  return (
    <>
      <Title>Day Planner</Title>
      <PageWrapper>
        <PlanWrapper>
          <form onSubmit={onSearchLocation}>
            <label htmlFor="city">City: </label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Please enter a destination..."
            />
            <PlannerInput type="submit" value="Search" />
          </form><br/>  
          <form onSubmit={onSaveTrip}>
            <label htmlFor="title">Title:</label>
            <input
              type="title"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            /><br/><br/>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              min="2021-01-01" 
              max="2023-12-31"
            onChange={(e) => setDate(e.target.value)}
            /><br/><br/>
            <PlannerInput type="submit" value="Save Trip" />
          </form>
          <h3>Itinerary: </h3>
          <ItineraryWrapper>
            {itineraryItems && itineraryItems.map((itineraryItem) =>
              <LandmarkCard 
                key={itineraryItem.name  + itineraryItem.id} 
                itineraryItem={itineraryItem}
                name={itineraryItem.name}
                xid={itineraryItem.xid}
                className="small itinerary"
                setItineraryItems={setItineraryItems}
                itineraryItems={itineraryItems}
                setText={setText}/>
            )}
          </ItineraryWrapper>
          <br/> 
          {text}
        </PlanWrapper>
        <LocationContainer>
          <LocationHeader id="info">Please search for a valid location</LocationHeader>
          <LandmarkWrapper>
            <div id="landmarks_list">
              {landmarks && landmarks.map((landmark) =>
                <LandmarkCard 
                  key={landmark.name} 
                  name={landmark.name}
                  xid={landmark.xid}
                  className="small"
                  setItineraryItems={setItineraryItems}
                  itineraryItems={itineraryItems}
                  setText={setText}/>
              )}
            </div>
            <LandmarkListFooter>
              <ListButton id="prev_button" onClick={() => setOffset(offset - pageLength)}>
                Prev
              </ListButton>
              <p id="footer_message">Now showing 1-5 of </p>
              <ListButton id="next_button" onClick={() => setOffset(offset + pageLength)}>
                Next
              </ListButton>
            </LandmarkListFooter>
            <p id="repeat_warning" >There are less than 5 landmarks rendered when there are repeats from the API</p>
          </LandmarkWrapper>
        </LocationContainer>
      </PageWrapper>
    </>
  );
}


