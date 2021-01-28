import { apiGet } from './apiGet'
import { getCountryName } from './directoryScript'


// Initiating global variables (static for now)
const pageLength = 5; // number of objects per page

let lon; // place longitude
let lat; // place latitude

let offset = 0; // offset from first object in the list
let count; // total objects count

export function landmarksSearch(props) {
  apiGet("geoname", "name=" + props.name).then(function(data) {
    let message = "Name not found";
    if (data.status === "OK") {
      message = "Landmarks for " + data.name + ", " + getCountryName(data.country);
      lon = data.lon;
      lat = data.lat;
      firstLoad();
    }
    document.getElementById("info").innerHTML = `${message}`;
  })
}

function firstLoad() {
  apiGet(
    "radius",
    `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
  ).then(function(data) {
    count = data.count;
    offset = 0;
    document.getElementById(
      "footer_count"
    ).innerHTML = `${count}`;
    // loadList();
  });
}

// function loadList() {
//   apiGet(
//     "radius",
//     `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
//   ).then(function(data) {
//     let landmarks_list = document.getElementById("landmarks_list");
//     landmarks_list.innerHTML = "";
//     data.forEach(item => landmarks_list.appendChild(createListItem(item)));
//     let nextBtn = document.getElementById("next_button");
//     let footerMessage = document.getElementById("footer_message");
//     if (count < offset + pageLength) {
//       nextBtn.style.visibility = "hidden";
//     } else {
//       nextBtn.style.visibility = "visible";
//       footerMessage.innerText = `Now showing ${1+offset}-${pageLength + offset} of ${count})`;
//     }
//   });
// }

// function createListItem(item) {
//   let LandmarkCard = document.createElement("a");
//   a.className = "list-group-item list-group-item-action";
//   a.setAttribute("data-id", item.xid);
//   a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>
//             <p class="list-group-item-text">${getCategoryName(item.kinds)}</p>`;

//   a.addEventListener("click", function() {
//     document.querySelectorAll("#list a").forEach(function(item) {
//       item.classList.remove("active");
//     });
//     this.classList.add("active");
//     let xid = this.getAttribute("data-id");
//     apiGet("xid/" + xid).then(data => onShowPOI(data));
//   });
//   return a;
// }