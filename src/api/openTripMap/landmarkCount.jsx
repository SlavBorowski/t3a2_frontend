import {apiGet} from './apiGet'

export function landmarkCount(name) {
  apiGet("geoname", "name=" + name).then(function(data) {
    if (data.status === "OK") {
      apiGet(
        "radius",
        `radius=1000&limit=1&offset=0&lon=${data.lon}&lat=${data.lat}&rate=20&format=count`
      ).then(function(data) {
        console.log(data.count);
        document.getElementById(name + "landmarkCount").innerHTML = `${data.count}`;
      });
    }
  });
}