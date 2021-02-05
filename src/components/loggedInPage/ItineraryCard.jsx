import { ItineraryCardWrapper, 
  ItineraryCardTitle, 
  ItineraryImageWrapper } from '../../styles/ItineraryCard'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function ItineraryCard(props) {
  return (
    <>
    <ItineraryCardWrapper>
      <ItineraryCardTitle>{props.title} - {props.date}</ItineraryCardTitle>
        <ItineraryImageWrapper>


        </ItineraryImageWrapper>
        <ItineraryCardTitle>{capitalizeFirstLetter(props.city)}</ItineraryCardTitle>  
    </ItineraryCardWrapper>
    </>
  );
}