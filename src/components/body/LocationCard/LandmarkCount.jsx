
export function LandmarkCount(props) {
  return (
    <span id={props.name + "landmarkCount"}>
      {props.landmarks}
    </span>
  )
}