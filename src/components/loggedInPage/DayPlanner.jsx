import { useEffect, useState } from 'react';

import {
  PageWrapper, 
  LandmarkWrapper, 
  Title,
  LocationContainer, 
  LocationHeader} from '../../styles/DayPlanner.js'

import LandmarkListFooterHTML from '../body/LandmarkCard/LandmarkListFooterHTML'
import LandmarkCard from '../body/LandmarkCard/LandmarkCard'
import DayPlannerForm from '../body/DayPlannerForm'

import { SetLandmarkListFooter } from '../../code_functions/SetLandmarkListFooter'
import {radiusCountSearch, loadList} from '../../api_open_trip_map/landmarksSearch'

export function DayPlanner() {
  const [landmarks, setLandmarks] = useState();
  const [itineraryItems, setItineraryItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const pageLength = 5;

  const [locationPos, setLocationPos] = useState([0,0]);
  const [count, setCount] = useState(0);

  //Text is used to update DOM when new itinerary items are pushed, do not remove
  const [text, setText] = useState("Please add landmarks to itinerary");

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
        <DayPlannerForm 
        setLocationPos={setLocationPos}
        setText={setText}
        text={text}
        count={count}
        itineraryItems={itineraryItems}
        setItineraryItems={setItineraryItems}/>

        <LocationContainer>
          <LocationHeader id="info">Please search for a valid location</LocationHeader>
          <LandmarkWrapper>
            <div id="landmarks_list">
              {landmarks && landmarks.map((landmark) =>
                <LandmarkCard 
                  key={landmark.name} 
                  name={landmark.name}
                  POI_id={landmark.xid}
                  className="small"
                  setItineraryItems={setItineraryItems}
                  itineraryItems={itineraryItems}
                  setText={setText}/>
              )}
            </div>
            <LandmarkListFooterHTML offset={offset} pageLength={pageLength} setOffset={setOffset}/>
            <p id="repeat_warning" >There are less than 5 landmarks rendered when there are repeats from the API</p>
          </LandmarkWrapper>
        </LocationContainer>

      </PageWrapper>
    </>
  );
}
