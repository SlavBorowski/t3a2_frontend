import CompareTime from './CompareTime'

export default function addEditItineraryItems(itineraryItem, itineraryItems, setItineraryItems, item, type, setText) {
  let itemId = itineraryItems.length;
  if(type === "edit") {
    itineraryItems.splice(itineraryItems.findIndex( item => item.id === itineraryItem.id ), 1);
    itemId = itineraryItem.id
  }

  itineraryItems.push(
    {
      "id": itemId,
      "name": item.name,
      "POI_id": item.POI_id,
      "time": item.time,
      "notes": item.notes
    }
  )
  itineraryItems.sort( CompareTime );
  setItineraryItems(itineraryItems)
  if(type === "add") setText(`You're visiting ${itineraryItems.length} landmarks today`)
  if(type === "edit") setText(`Visiting ${item.name} is now set to ${item.time}`)
  // console.log(props.itineraryItems)
}