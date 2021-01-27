import { CardWrapper, CardImage, CardBodyWrapper} from '../../../styles/LocationCard'

export function LocationCard() {
  return (
    <CardWrapper>
      <CardImage src="/images/stock_location_image1.png" alt="City Feature" />
      <CardBodyWrapper>
        <h2>Prague</h2>
        <h4>1136 Landmarks within 1km</h4>
        <p> 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Praesent ut nulla dapibus massa congue placerat vestibulum a justo. 
          Praesent diam urna, egestas id ipsum dapibus, porttitor molestie magna. 
          Phasellus vel mi vitae mi bibendum rutrum in non ante. 
        </p>
      </CardBodyWrapper>
      
    </CardWrapper>
  );
}