import {LocationCard} from '../body/LocationCard/LocationCard'
import {LocationCardsWrapper} from '../../styles/LocationCard'
import {HomePageBody} from '../../styles/App'
import Locations from '../body/LocationCard/locations.json'

export function Home() {
  const location_ids = Array.from({length: Locations.length}, (v, i) => i);
  const locationCards = location_ids.map((id) =>
    <LocationCard key={id.toString()} id={id} />
  );

  return (
    <HomePageBody>
      <h1>Popular Locations</h1>
      <LocationCardsWrapper>
        {locationCards}
      </LocationCardsWrapper>
    </HomePageBody>
  );
}