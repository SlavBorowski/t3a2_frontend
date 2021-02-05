

export default async function SaveTrip(title, date, city, itineraryItems) {
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
  