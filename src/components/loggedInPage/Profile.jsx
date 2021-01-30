import { useState, useEffect } from 'react'

export function Profile() {
  const [user, setUser] = useState([]);

  function fetchUser() {
    // console.log("Fetching User")
    // console.log("Token: " + localStorage.getItem('token'))
    fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((body) => setUser(body));
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
    </>
  );
}