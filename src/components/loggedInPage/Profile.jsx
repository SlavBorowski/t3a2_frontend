import {useEffect, useState} from 'react';
import { LoginContext } from '../App';
import { useContext } from 'react';
import { TripCard } from '../body/TripCard';
import { BackendRequestGET, BackendRequestDELETE } from '../../code_functions/BackendRequest'
import { ProfileWrapper, 
  ProfileButton,
  InfoWrapper,
  BioWrapper,
  ImageWrapper,
  ProfileTitle,
  PageWrapper } from '../../styles/Profile'

export function Profile(props) {

  const [profile, setProfile] = useState({message: "test"});
  const { setLogin } = useContext(LoginContext);
  const [tripsCompleted, setTripsCompleted] = useState([]);
  const [tripsPending, setTripsPending] = useState([]);
  const [itineraryItems, setItineraryItems] = useState([]);

  useEffect(() => {
    BackendRequestGET("profile", setProfile)
    BackendRequestGET("trips_pending", setTripsPending)
    BackendRequestGET("itinerary", setItineraryItems)
  }, [])

  // Completed trips load after pending trips because the delay depends on the number of pending
  // This is to avoid the 429 Too many requests error
  useEffect(() => {
    if(tripsPending.length > 0){
      setTimeout(() => {
        BackendRequestGET("trips_completed", setTripsCompleted)
      }, (2000*tripsPending.length));
    }
  }, [tripsPending.length])

  // Check profile has been created, if not push history to form
  useEffect(() => {
    if(profile.message === "no_profile") props.history.push("/profile/form");
  }, [profile, props.history])

  // Deletes user account after confirm
  function onDeleteLinkClick(e) {
    e.preventDefault();
    if (window.confirm("Would you like to delete?")) {
      BackendRequestDELETE("user")
      localStorage.removeItem("token");
      setLogin(false);
      props.history.push("/")
    }
  }

  return (
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
      <ProfileButton onClick={() => {props.history.push("/profile/form")}}>Edit Profile</ProfileButton>
      <ProfileButton onClick={(e) => onDeleteLinkClick(e)}>Delete Account</ProfileButton>

      <div>
        <h2>Pending Journeys: </h2>
        {tripsPending && tripsPending.map((trip, index) =>
          <TripCard
            key={trip.title} trip={trip} index={index}
            itineraryItems={itineraryItems}/>
        )}
      </div>
      <br />
      <div>
        <h2>Completed Journeys: </h2>
        {tripsCompleted && tripsCompleted.map((trip, index) =>
          <TripCard
            key={trip.title} trip={trip} index={index}
            itineraryItems={itineraryItems}/>
        )}
      </div>  
    </PageWrapper>
  );
}