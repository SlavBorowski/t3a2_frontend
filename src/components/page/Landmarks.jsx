import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { SubPageBody, LandmarkListFooter, ListButton } from '../../styles/App';
import { LandmarkCard } from '../body/LandmarkCard/LandmarkCard'
// import {landmarksSearch} from '../../api/openTripMap/landmarksSearch'
import {apiGet} from '../../api/openTripMap/apiGet'
import { getCountryName } from '../../api/openTripMap/directoryScript'

export function Landmarks() {
  let { location } = useParams();
  const [locationPos, setLocationPos] = useState([0,0]);
  const [landmarks, setLandmarks] = useState();
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const pageLength = 5;

  // Retrieves location data on ComponentDidMount once or when location is changed
  useEffect(() => {
    console.log("Retrieving Location Data");
    apiGet("geoname", "name=" + location).then(function(data) {
      let message = "Please search for a valid location";
      if (data.status === "OK") {
        message = "Landmarks for " + data.name + ", " + getCountryName(data.country);
        setLocationPos([data.lon, data.lat]);
      }
      document.getElementById("info").innerHTML = `${message}`;
    }).then(() => {
      apiGet(
        "radius",
        `radius=1000&lon=${locationPos[0]}&lat=${locationPos[1]}&rate=2&format=count`
      ).then(function(countData) {
        setCount(countData.count);
      });
    });

    console.log("Location:" + location);
    console.log("LocationPos:" + locationPos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, locationPos[0]]);

  // Updates list, note and buttons when offset/count is changed
  useEffect(() => {
    let prevBtn = document.getElementById("prev_button");
    let nextBtn = document.getElementById("next_button");

    let btnVisibility = "visible";
    if (offset === 0) btnVisibility = "hidden";
    prevBtn.style.visibility = btnVisibility;

    let footerMessage = document.getElementById("footer_message");
    // console.log("outside offset:" + offset);
    if (count < offset + pageLength) {
      nextBtn.style.visibility = "hidden";
      footerMessage.innerText = `Now showing ${1+offset}-${count} of ${count}`;
    } else {
      nextBtn.style.visibility = "visible";
      footerMessage.innerText = `Now showing ${1+offset}-${pageLength + offset} of ${count}`;
    }
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, count])

  function loadList() {
    window.scrollTo(0, 0);
    apiGet(
      "radius",
      `radius=1000&limit=${pageLength}&offset=${offset}&lon=${locationPos[0]}&lat=${locationPos[1]}&rate=2&format=json`
    ).then(function(landmarksData) {
      const timer = setTimeout(() => {
        const landmarkItemArr = landmarksData.map(item => item)
        setLandmarks(getUnique(landmarkItemArr))
      }, (500));
      return () => clearTimeout(timer);
    })
  }

  // Defining function to get unique values from an array
  function getUnique(array){
    var uniqueArray = [];
    
    // Loop through array values
    for(let i=0; i < array.length; i++){
        if(uniqueArray.findIndex(item => item.name === array[i].name) === -1) {
            uniqueArray.push(array[i]);
        }
    }

    let repeatWarning = document.getElementById("repeat_warning");
    repeatWarning.style.visibility = "hidden";
    if(uniqueArray.length < pageLength) repeatWarning.style.visibility = "visible";
    return uniqueArray;
  }

  return (
    <SubPageBody>
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
    </SubPageBody>
  );
}