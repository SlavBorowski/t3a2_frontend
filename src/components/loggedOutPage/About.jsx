import { SubPageBody } from '../../styles/App';
import { AboutWrapper } from '../../styles/About'
export function About() {
  return (
    <SubPageBody>
      <h1>About</h1>
      <AboutWrapper>As avid travelling photographers, we've searched the internet and found few useful tools for use 
        in planning photography expeditions around the globe, so we’ve decided to put together our own. 
        By using the data provided by OpenTripMap and Wikipedia you’ll be able to view various cities 
        around the globe and any landmarks that you may want to visit and photograph. Once you’ve 
        registered an account you can plan your trip, setting up itineraries for multiple days including
        notes, times that you want to visit (so you can capture that perfect golden hour shot) and store
        any photos you would like to use as a reference for your visit. At the end of each day you can
        add reflections and upload all of your photos to keep as a travel journal or to use as a
        reference for any future visits.</AboutWrapper>
    </SubPageBody>
  );
}