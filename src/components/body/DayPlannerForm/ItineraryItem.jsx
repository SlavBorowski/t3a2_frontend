import { 
  SmallLandmarkCard,
  SmallThumbnailImage,
  SmallCardBody, 
  SmallCardTitle } from '../../../styles/SmallLandmarkCard';

  import { useState, useEffect } from 'react'
  import {apiGet} from '../../../api/openTripMap/apiGet'

  

export function ItineraryItem (props) {
  const [landmarkImageSrc, setLandmarkImageSrc] = useState();

  useEffect(() => {
    if(props.xid){
      const timer = setTimeout(() => {
        apiGet("xid/" + props.xid).then(data => {
          if (data.preview) setLandmarkImageSrc(data.preview.source)
        })
        }, (500));
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.xid]);

  return (
    <>
      <SmallLandmarkCard>
        <SmallThumbnailImage src={landmarkImageSrc}/>
        <SmallCardBody>
          <SmallCardTitle>{props.time}: <br /> {props.name}</SmallCardTitle>
        </SmallCardBody>
      </SmallLandmarkCard>
    </>
  )
}