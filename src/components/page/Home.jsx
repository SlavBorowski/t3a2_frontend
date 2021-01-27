import {LocationCard} from '../body/LocationCard/LocationCard'
import {LocationCardsWrapper} from '../../styles/LocationCard'
import {HomePageTitle} from '../../styles/App'

export function Home() {
  return (
    <>
      <HomePageTitle>Popular Locations</HomePageTitle>
      <LocationCardsWrapper>
        <LocationCard id={0} />
        <LocationCard id={1} />
        <LocationCard id={2} />
        <LocationCard id={3} />
        <LocationCard id={4} />
        <LocationCard id={5} />
      </LocationCardsWrapper>
    </>
  );
}