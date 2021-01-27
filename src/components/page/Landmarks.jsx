import { useParams } from "react-router-dom";
import {SubPageBody} from '../../styles/App'

export function Landmarks() {
  let { location } = useParams();
  return (
    <SubPageBody>
      <h2>Landmarks for {location}</h2>
    </SubPageBody>
  );
}