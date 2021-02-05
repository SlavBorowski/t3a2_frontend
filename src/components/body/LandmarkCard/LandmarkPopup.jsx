import { StyledLandmarkCard, CardComponents } from '../../../styles/LandmarkCard'

export default function LandmarkPopup(props) {
  return (
    <StyledLandmarkCard className="small">
      <CardComponents className="image" src={props.landmarkImageSrc}/>
      <CardComponents className="body">
        <CardComponents className="title">{props.name}</CardComponents>
        <CardComponents className="text" >{props.landmarkDescription}</CardComponents>
      </CardComponents>
    </StyledLandmarkCard>
  )
}