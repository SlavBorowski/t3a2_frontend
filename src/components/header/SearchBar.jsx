import React, { useState } from "react";
import { NavButton, SearchInput } from '../../styles/SearchBar'

export function SearchBar() {
  const [location, setLocation] = useState("");

  return (
    <>
        <label htmlFor="location"></label>
        <SearchInput
          type="text"
          name="location"
          id="location"
          placeholder="Search..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <NavButton to={"/landmarks/" + location } >Submit</NavButton>
    </>
  );
}

