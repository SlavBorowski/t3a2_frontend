import { NavWrapper, NavButton } from '../../styles/NavBar'
import { useHistory } from "react-router-dom";

export function NavBar() {

  const history = useHistory();

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/")
  }

  return (
    <NavWrapper>
      <NavButton to="/">Home </NavButton>
      <NavButton to="/about">About </NavButton>
      <NavButton to="/landmarks/Paris">Places </NavButton>
      <NavButton to="/day_planner">Plans </NavButton>
      <NavButton to="/profile">Profile </NavButton>
      <NavButton to="/login">Login</NavButton>
      <NavButton to="/sign-up">Sign Up</NavButton>
      <NavButton onClick={logout} to="/">Logout</NavButton>
    </NavWrapper>
  );
}