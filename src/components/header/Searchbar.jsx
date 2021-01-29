import React, { useState } from "react";
import { NavButton, SearchInput, SearchForm } from '../../styles/Searchbar'

export function SearchBar(props) {
  const [location, setLocation] = useState("");

  return (
    <>
      <SearchForm >
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
      </SearchForm>
      
    </>
  );
}

