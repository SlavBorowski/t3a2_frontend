import { BackendRequestPOST, BackendRequestDELETE } from './BackendRequest'

export default async function SaveTrip(trip_body, title, itineraryItems, trip_id) {
  if(trip_id) BackendRequestDELETE(`trips/${trip_id}`)
  setTimeout(() => {
    createNewTrip(trip_body, title, itineraryItems)
  }, (100));
}

function createNewTrip(trip_body, title, itineraryItems) {
  try {
    const response = BackendRequestPOST("trips", trip_body)
    setTimeout(() => {
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else { 
        itineraryItems.map(async function itineraryPost(itinerary_item) {
          delete itinerary_item.id
          let itineraryBody = JSON.stringify({itinerary_item})
          BackendRequestPOST(`${title}/itinerary`, itineraryBody)
        })
      }
    }, (100));
  } catch (err) {
    console.log(err.message);
  }
}
  