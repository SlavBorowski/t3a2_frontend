import { BannerWrapper } from '../../styles/BannerWrapper'
import { BannerText } from '../../styles/BannerText'

export function Banner() {
  return (
    <>
      <img src="/banner.jpg" alt="Mount Bromo volcano" width="100%" />
      <BannerWrapper>
      <BannerText>The Travelling Photographer</BannerText>
    </BannerWrapper>
    </>
  );
}