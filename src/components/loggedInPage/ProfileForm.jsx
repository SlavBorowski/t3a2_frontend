import {useState, useEffect} from 'react';

export function ProfileForm(props) {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [favorite_place, setFavPlace] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("no_profile")

  useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
      })
      .then((res) => res.json())
      .then((profile) => {
        if(profile.message !== "no_profile") {
          setMessage(profile.message)
          setName(profile.name);
          setFavPlace(profile.favorite_place);
          setBio(profile.bio);
        }
      });
  }, []);

  async function onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("favorite_place", favorite_place);
    formData.append("bio", bio);
    try {
      if(message === "profile") {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
      }
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
        method: "POST",
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
        body: formData,
      });
      if (response.status >= 400) {
        throw new Error("not authorized");
      } else props.history.push("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h2>Create/Edit Profile:</h2>
      <form encType="multipart/form-data" onSubmit={onFormSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br/><br/>
        <label htmlFor="file">Profile image: </label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <br/><br/>
        <label htmlFor="favorite_place">Favorite Place: </label>
        <input
          type="text"
          name="favorite_place"
          id="favorite_place"
          value={favorite_place}
          onChange={(e) => setFavPlace(e.target.value)}
        />
        <br/><br/>
        <label htmlFor="bio">Bio: </label>
        <input
          type="text"
          name="bio"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <br/><br/>
        <input type="submit" value="Submit"/>
      </form>
    </>
  );
}