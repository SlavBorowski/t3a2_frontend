import { 
  CardWrapper, 
  CardImage, 
  CardBodyWrapper, 
  CardTitle, 
  CardSubTitle, 
  CardText} from '../../../styles/LocationCard'
import { LandmarkCount } from './LandmarkCount'
import Locations from './locations.json'
// import {useEffect} from 'react' // Only use for demos
// import { landmarkCount } from '../../../api/openTripMap/landmarkCount' // Only use for demos


export function LocationCard(props) {
  const location = {
    img_src: Locations[props.id].img_src, 
    title: Locations[props.id].title, 
    landmarks: Locations[props.id].landmarks,
    description: Locations[props.id].description
  };

  // Only use for demos, too many API requests for main page
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     landmarkCount(Locations[props.id].title);
  //   }, (600 * props.id));
  //   return () => clearTimeout(timer);
  // })

  return (
      <CardWrapper to={"/landmarks/" + Locations[props.id].title}>
        <CardImage src={location.img_src} alt="City Feature" />

        <CardBodyWrapper>
          <CardTitle>{location.title}</CardTitle>
          <CardSubTitle><LandmarkCount name={location.title} landmarks={location.landmarks}/> Landmarks within 1km</CardSubTitle>
          <CardText>{location.description}</CardText>
        </CardBodyWrapper>
      
      </CardWrapper>
  );
}