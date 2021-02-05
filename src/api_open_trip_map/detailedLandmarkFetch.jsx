import {apiGet} from './apiGet'

export function detailedLandmarkFetch (xid, setLandmarkImageSrc, setLandmarkDescription) {
  if(xid){
    const timer = setTimeout(() => {
      apiGet("xid/" + xid).then(data => {
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
}