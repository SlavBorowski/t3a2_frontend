
import { LandmarkListFooter, ListButton } from '../../../styles/App';

export default function LandmarkListFooterHTML(props) {
  return (
    <LandmarkListFooter>
        <ListButton id="prev_button" onClick={() => props.setOffset(props.offset - props.pageLength)}>
          Prev
        </ListButton>
        <p id="footer_message">Now showing 1-5 of </p>
        <ListButton id="next_button" onClick={() => props.setOffset(props.offset + props.pageLength)}>
          Next
        </ListButton>
      </LandmarkListFooter>
  )
}