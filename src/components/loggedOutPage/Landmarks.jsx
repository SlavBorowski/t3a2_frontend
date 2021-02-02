import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { LandmarkListFooter, ListButton } from '../../styles/App';
import { LandmarkCard } from '../body/LandmarkCard/LandmarkCard'
import { SetLandmarkListFooter } from '../../code_functions/SetLandmarkListFooter'
import { 
  landmarksSearch, 
  radiusCountSearch, 
  loadList } from '../../api/openTripMap/landmarksSearch'

export function Landmarks() {
  let { location } = useParams();
  const [locationPos, setLocationPos] = useState([0,0]);
  const [landmarks, setLandmarks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const pageLength = 5;
  // const [locationData, setLocationData] = useState([]);

  // Retrieves location data on ComponentDidMount once or when location is changed
  useEffect(() => {
    landmarksSearch(location)
    .then(position => setLocationPos(position))
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, count]);

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
  }, [locationPos, offset]);

  return (
    <>
      <h2 id="info">Loading...</h2>
      <div id="landmarks_list">
        {landmarks && landmarks.map((landmark) =>
          <LandmarkCard 
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
  );
}