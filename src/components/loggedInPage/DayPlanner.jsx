import { useEffect, useState } from 'react';
import { LandmarkListFooter, ListButton } from '../../styles/App';
import { LandmarkCardLinks } from '../body/LandmarkCard/LandmarkCardLinks'

import { SetLandmarkListFooter } from '../../code_functions/SetLandmarkListFooter'
import { landmarksSearch, radiusCountSearch, loadList} from '../../api/openTripMap/landmarksSearch'

export function DayPlanner() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [locationPos, setLocationPos] = useState([0,0]);
  const [landmarks, setLandmarks] = useState();
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const pageLength = 5;

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
          console.log("Trip saved successfully.");
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
  }, [city, count])

  function onSearchLocation(e){
    if(e) {
      e.preventDefault()
      setCity(e.target.city.value)
    }
    if(city){
      landmarksSearch(city)
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
    loadList(locationPos, pageLength, offset)
    .then(landmarkItemArr => setLandmarks(landmarkItemArr))

    SetLandmarkListFooter(offset, pageLength, count)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationPos, offset]);
  
  return (
    <>
      <h2>DayPlanner</h2>

        <form onSubmit={onSearchLocation}>
          <label htmlFor="city">City: </label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Search..."
          />
          <input type="submit" value="Submit" />
        </form>  
        <form onSubmit={onSaveTrip}>
        <label htmlFor="title">Title:</label>
        <input
          type="title"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />    
        <input type="submit" value="Save Trip" />
      </form>
    
    <>
    <h2 id="info">Please search for a valid location</h2>
    <div id="landmarks_list">
      {landmarks && landmarks.map((landmark) =>
        <LandmarkCardLinks 
          key={landmark.name} 
          name={landmark.name}
          id={landmark.xid}/>
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
    </>
  </>
  );
}


