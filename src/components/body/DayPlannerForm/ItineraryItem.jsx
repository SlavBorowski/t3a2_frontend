import { 
  SmallLandmarkCard,
  SmallThumbnailImage,
  SmallCardBody, 
  SmallCardTitle,
  CardButtons } from '../../../styles/SmallLandmarkCard';

  import { useState, useEffect } from 'react'
  import {apiGet} from '../../../api/openTripMap/apiGet'
  import {PopupModal} from '../LandmarkCard/PopupModal'

  

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
          <CardButtons>
            <PopupModal 
              type={'details'}
              title={props.name}
              content={landmarkDescription}
              img_src={landmarkImageSrc}
            />
            <PopupModal 
              type={'add_edit'}
              title={<LandmarkPopup />}
              name={props.name}
              xid={props.id}
              setItineraryItems={props.setItineraryItems}
              itineraryItems={props.itineraryItems}
              setText={props.setText}
            />
          </CardButtons>
          <SmallCardTitle>{props.time}: <br /> {props.name}</SmallCardTitle>
        </SmallCardBody>
      </SmallLandmarkCard>
    </>
  )
}