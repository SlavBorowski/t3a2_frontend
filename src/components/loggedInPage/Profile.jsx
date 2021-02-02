import {useEffect, useState} from 'react';
import { LoginContext } from '../App';
import { useContext } from 'react';

export function Profile(props) {

  const [profile, setProfile] = useState()
  const { setLogin } = useContext(LoginContext);

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

  return (
    <>
      {profile &&
      <>
        <h2>{profile.name}</h2>
        <img width="200px" src={profile.image_url} alt="profile" />
        {profile.favorite_place && <p>Favorite Place: {profile.favorite_place}</p>}
        {profile.bio && <p>Bio: {profile.bio}</p>}
      </>
      }
      <button onClick={(e) => onEditLinkClick(e)}>Edit Profile</button>
      <button onClick={(e) => onDeleteLinkClick(e)}>Delete Account</button>
    </>
  );
}