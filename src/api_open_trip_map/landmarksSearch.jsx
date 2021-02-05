import { apiGet } from './apiGet'
import { getCountryName } from './directoryScript'
import { GetUnique } from '../code_functions/GetUnique'

let returnData = []; //contains return data of functions

// Returns location position data
export function landmarksSearch(location) {
  return new Promise(function(resolve, reject) {
    // console.log("Retrieving Location Data");
    apiGet("geoname", "name=" + location).then(function(data) {
      let message = "Please search for a valid location";
      if (data.status === "OK") {
        message = "Landmarks for " + data.name + ", " + getCountryName(data.country);
        returnData = [data.lon, data.lat];
      }
      let messageHeading = document.getElementById("info");
      if(messageHeading) messageHeading.innerHTML = `${message}`;
    }).then(() => resolve(returnData))
  });
  
}

// Returns poi count based on location position
export function radiusCountSearch(locationPos) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      if(locationPos){
        apiGet(
          "radius",
          `radius=1000&limit=5&offset=0&lon=${locationPos[0]}&lat=${locationPos[1]}&rate=2&format=count`
        ).then(data => resolve(data.count));
      }
    }, (500));
  });
}

// Returns poi list based on location position
export function loadList(locationPos, pageLength, offset, scrollTop) {
  return new Promise(function(resolve, reject) {
    if(scrollTop) window.scrollTo(0, 0);
    setTimeout(() => {
      if(locationPos[0]){
        apiGet(
          "radius",
          `radius=1000&limit=${pageLength}&offset=${offset}&lon=${locationPos[0]}&lat=${locationPos[1]}&rate=2&format=json`
        ).then(function(landmarksData) {
          if(landmarksData.response_status !== "false") { 
            const landmarkItemArr = landmarksData.map(item => item)
            resolve(GetUnique(landmarkItemArr, pageLength))
          }
        })
      }
    }, (1000));
  });
}