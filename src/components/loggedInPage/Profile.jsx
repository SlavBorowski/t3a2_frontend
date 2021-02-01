import {useEffect, useState} from 'react';

export function Profile(props) {

  const [profile, setProfile] = useState()

  useEffect(() => {
    async function getProfile() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
    </>
  );
}