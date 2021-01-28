import { 
  CardWrapper, 
  CardImage, 
  CardBodyWrapper, 
  CardTitle, 
  CardSubTitle, 
  CardText} from '../../../styles/LocationCard'
import { LandmarkCount } from './LandmarkCount'
import Locations from './locations.json'

export function LocationCard(props) {
  const location = {
    img_src: Locations[props.id].img_src, 
    title: Locations[props.id].title, 
    landmarks: Locations[props.id].landmarks,
    description: Locations[props.id].description
  };

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