import { PrivateTitle, 
  PrivateDate,
  PrivateText,
  PrivatePageWrapper,
  PrivateTextWrapper,
  PrivateInfoWrapper } from "../../styles/LandmarkPrivate";

import {useState, useEffect} from 'react'
import {useParams} from "react-router-dom";
import {BackendRequestDELETE} from '../../code_functions/BackendRequest'

export function LandmarkPrivateEdit(props) {

  let { landmark_title, landmark_city } = useParams();
  const [message, setMessage] = useState("no_landmark")
  const [files, setFiles] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/private_landmark/${landmark_title}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.landmark) {
        setMessage(data.landmark.message)
        document.getElementById("latest_visit").value = data.landmark.latest_visit
        document.getElementById("notes").value = data.landmark.notes
      }
    });
}, [landmark_title]);


  async function onLandmarkSave(e) {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("images", document.getElementById("images").value);
    formData.append("latest_visit", document.getElementById("latest_visit").value);
    formData.append("notes", document.getElementById("notes").value);
    formData.append("title", landmark_title);
    formData.append("city", landmark_city);
    formData.append("image_number", files.length);

    Array.from(files).forEach((file, index) => formData.append(`file_${index}`, file))

    try {
      if(message === "landmark") { await BackendRequestDELETE(`private_landmark/${landmark_title}`) }
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private_landmark`, {
        method: "POST",
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
        body: formData,
      });
      if (response.status >= 400) {
        throw new Error("not authorized");
      } else props.history.push(`/private_gallery/${landmark_city}/${landmark_title}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <PrivatePageWrapper>
      <form onSubmit={onLandmarkSave} encType="multipart/form-data">
      <PrivateTextWrapper>
        <PrivateInfoWrapper>
          <PrivateTitle>{landmark_title}, {landmark_city}</PrivateTitle>
          <PrivateDate>Date to visit/visited:</PrivateDate>
          <input type="date" name="latest_visit" id="latest_visit"/>
        </PrivateInfoWrapper>
        
        <PrivateText>Notes: <br />
          <textarea name="notes" id="notes" cols="50" rows="10"></textarea>
        </PrivateText>
      </PrivateTextWrapper>
      <label htmlFor="images">Images Upload: </label>
      <input type="file" name="images" id="images" multiple
      onChange={(e) => {setFiles(e.target.files);}}/>
      <br /><br />
      <input type="submit" value="Save Landmark Info"/>

      {/* <PrivateImageWrapper>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
      </PrivateImageWrapper> */}
      </form>
    </PrivatePageWrapper>
  );
}