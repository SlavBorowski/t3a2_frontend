import { useParams } from "react-router-dom";
import { useEffect, useState} from 'react';
import { SubPageBody } from '../../styles/App';
import { LandmarkCard } from '../body/LandmarkCard/LandmarkCard'
import {apiGet} from '../../api/openTripMap/apiGet'

export function Landmarks() {
  let { location } = useParams();
  const [landmarks, setLandmarks] = useState();

  // Runs on ComponentDidMount once and will set the landmarks
  useEffect(() => {
    apiGet("geoname", "name=" + location).then(function(data) {
      if (data.status === "OK") {
        apiGet(
          "radius",
          `radius=1000&limit=5&offset=0&lon=${data.lon}&lat=${data.lat}&rate=2&format=json`
        ).then(function(data) {
          setLandmarks(data.map(item => item))
        });
      }
    });
  }, [location]);

  return (
    <SubPageBody>
      <h2>Landmarks for {location}</h2>
      <div id="landmarks_list">
        {landmarks && landmarks.map((landmark) =>
          <LandmarkCard 
            key={landmark.name} 
            name={landmark.name}
            id={landmark.xid}/>
        )}
      </div>
    </SubPageBody>
  );
}