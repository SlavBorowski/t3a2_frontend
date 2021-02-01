import {
  CardWrapper, 
  ThumbnailImage,
  CardBody, 
  CardTitle} from '../../../styles/LandmarkCard'

import { useEffect, useState} from 'react';
import {apiGet} from '../../../api/openTripMap/apiGet'

export function LandmarkCardLinks(props) {
  const [landmarkDescription, setLandmarkDescription] = useState();
  const [landmarkImageSrc, setLandmarkImageSrc] = useState();

  // Runs on ComponentDidMount once and will set the landmark image/description
  useEffect(() => {
    if(props.id){
      const timer = setTimeout(() => {
        apiGet("xid/" + props.id).then(data => {
          if (data.preview) setLandmarkImageSrc(data.preview.source)
          setLandmarkDescription(data.wikipedia_extracts
          ? data.wikipedia_extracts.text
          : data.info
          ? data.info.descr
          : "No description")
          })
      }, (500));
      return () => clearTimeout(timer);
    }
  }, [props.id]);

  return (
      <CardWrapper>
        <ThumbnailImage src={landmarkImageSrc}/>
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <p>{landmarkDescription}</p>
        </CardBody>
      </CardWrapper>
  );
}