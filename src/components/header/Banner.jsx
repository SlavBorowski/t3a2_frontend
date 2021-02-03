import React, { useState } from "react";

import { BannerWrapper, BannerText } from '../../styles/header'
import { SearchBar } from "./Searchbar";


export function Banner() {

  return (
    <BannerWrapper>
      <BannerText>The Travelling Photographer</BannerText>
      <SearchBar />
    </BannerWrapper>
  );
}