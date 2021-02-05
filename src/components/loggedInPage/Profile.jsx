import {useEffect, useState} from 'react';
import { LoginContext } from '../App';
import { useContext } from 'react';
import { ItineraryCard } from './ItineraryCard'
import { ProfileWrapper, 
  ProfileButton,
  InfoWrapper,
  BioWrapper,
  ImageWrapper,
  ProfileTitle,
  PageWrapper } from '../../styles/Profile'

export function Profile(props) {

  const [profile, setProfile] = useState();
  const { setLogin } = useContext(LoginContext);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function getProfile() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status >= 400) {
        throw new Error("not authorized");
      } else {
        const data = await response.json()
        setProfile(data);
        if(data.message === "no_profile") props.history.push("/profile/form");
      }
    }
    getProfile()
  }, [props.history])

  useEffect(() => {
    async function getTrips() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/trips`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status >= 400) {
        throw new Error("not authorized");
      } else {
        const data = await response.json()
        console.log(data)
        setTrips(data);
        console.log(trips)
      }
    }
    getTrips()
  }, [])

  function onEditLinkClick(e) {
    e.preventDefault()
    props.history.push("/profile/form")
  }

  async function onDeleteLinkClick(e) {
    try {
      e.preventDefault();
      if (window.confirm("Would you like to delete?")) {
        await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          }
        );
        localStorage.removeItem("token");
        setLogin(false);
        props.history.push("/")
      }
    } catch (err) {
      console.log(err.message);
    }
  }
//test
  return (
    <>
    <PageWrapper>
      {profile &&
      <>
        <ProfileTitle>{profile.name}'s Journeys</ProfileTitle>
        <ProfileWrapper>
          <ImageWrapper><img width="200px" src={profile.image_url} alt="profile" /></ImageWrapper>
          <InfoWrapper>{profile.favorite_place && <><h3>Favorite Place:</h3> {profile.favorite_place}</>}</InfoWrapper>
          <BioWrapper>{profile.bio && <><h3>Bio:</h3> {profile.bio}</>}</BioWrapper>
        </ProfileWrapper>  
      </>
      }
      <ProfileButton onClick={(e) => onEditLinkClick(e)}>Edit Profile</ProfileButton>
      <ProfileButton onClick={(e) => onDeleteLinkClick(e)}>Delete Account</ProfileButton>

      <div>
      {trips && trips.map((trip) =>
          <ItineraryCard
            key={trip.title} 
            title={trip.title}
            id={trip.id}
            city={trip.city}
            date={trip.date}/>
        )}
      </div>  
    </PageWrapper>
    </>
  );
}