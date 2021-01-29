import React, { useState } from "react";

import { BannerWrapper, BannerText } from '../../styles/header'
import { SearchBar } from "./Searchbar";


export function Banner() {
  const [query, setQuery] = useState("");

  return (
    <BannerWrapper>
      <BannerText>The Travelling Photographer</BannerText>
      <SearchBar setQuery={setQuery} />
    </BannerWrapper>
  );
}