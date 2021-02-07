import { PrivateTitle, 
  PrivateDate,
  PrivateText,
  PrivatePageWrapper,
  PrivateImageWrapper,
  PrivateTextWrapper,
  PrivateImagePlaceholder,
  PrivateInfoWrapper } from "../../styles/LandmarkPrivate";



export function LandmarkPrivate() {
  return (
    <>
    <PrivatePageWrapper>
      <PrivateTextWrapper>
        <PrivateInfoWrapper>
          <PrivateTitle>Landmark Name</PrivateTitle>
          <PrivateDate>Date I last visited: 20/02/2021</PrivateDate>
        </PrivateInfoWrapper>  
        
        <PrivateText>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</PrivateText>
      </PrivateTextWrapper>

      <PrivateImageWrapper>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
        <PrivateImagePlaceholder></PrivateImagePlaceholder>
      </PrivateImageWrapper>
    </PrivatePageWrapper>
    </>
  );
}