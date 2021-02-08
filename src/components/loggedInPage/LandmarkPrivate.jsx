import { PrivateTitle, 
  PrivateDate,
  PrivateText,
  PrivatePageWrapper,
  PrivateImageWrapper,
  PrivateTextWrapper,
  PrivateImagePlaceholder,
  PrivateInfoWrapper,
  PrivateButton } from "../../styles/LandmarkPrivate";

import {useParams} from "react-router-dom";
import { BackendRequestGETLandmark } from "../../code_functions/BackendRequest";
import { useEffect, useState } from "react";


export function LandmarkPrivate(props) {

  const [landmark, setLandmark] = useState([]);
  let { landmark_title, landmark_city } = useParams();

  useEffect(() => {
    BackendRequestGETLandmark(`private_landmark/${landmark_title}`, setLandmark)
    // if(landmark) console.log(landmark.image_urls)
  }, [landmark_city, landmark_title])


  return (
    <PrivatePageWrapper>
      <PrivateTextWrapper>
        <PrivateInfoWrapper>
          <PrivateTitle>{landmark_title}, {landmark && landmark.city}</PrivateTitle>
          <PrivateDate>
            Date last visited: 
            {landmark && landmark.latest_visit ? landmark.latest_visit : "To be visited"}
          </PrivateDate>
        </PrivateInfoWrapper>
        
        <PrivateText>Notes: <br />
          {landmark && landmark.notes ? 
            landmark.notes :
            " Placeholder text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod" + 
            "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
            "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse " + 
            "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non " +
            "proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
        </PrivateText>
        <PrivateButton 
          onClick={() => {props.history.push(`/private_gallery/${landmark_city}/${landmark_title}/edit`)}}>
          Edit
        </PrivateButton>
      </PrivateTextWrapper>

      <PrivateImageWrapper>
          {landmark && landmark.image_urls && landmark.image_urls.map((url, index) =>
            <PrivateImagePlaceholder key={"landmark_image " + index}>
              <img width="100%" height="100%" src={url} alt="landmark"/>
            </PrivateImagePlaceholder>
          )}
      </PrivateImageWrapper>
    </PrivatePageWrapper>
  );
}