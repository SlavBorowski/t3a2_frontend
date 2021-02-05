import { BannerWrapper, BannerText } from '../../styles/header'
import { SearchBar } from "./SearchBar";


export function Banner() {
  return (
    <BannerWrapper>
      <BannerText>The Travelling Photographer</BannerText>
      <SearchBar />
    </BannerWrapper>
  );
}