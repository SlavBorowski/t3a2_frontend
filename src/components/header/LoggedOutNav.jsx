import { NavWrapper, NavButton } from '../../styles/NavBar'

export function LoggedOutNav() {
  return (
    <NavWrapper>
      <NavButton to="/">Home </NavButton>
      <NavButton to="/about">About </NavButton>
      <NavButton to="/landmarks/Paris">Places </NavButton>
      <NavButton to="/login">Login</NavButton>
      <NavButton to="/sign-up">Sign Up</NavButton>
    </NavWrapper>
  );
}