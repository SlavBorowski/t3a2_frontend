import { NavWrapper, NavButton } from '../../styles/NavBar'
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import { LoginContext } from '../App';


export function NavBar() {

  const history = useHistory();
  const { login, setLogin } = useContext(LoginContext);

  function logout() {
    localStorage.removeItem("token");
    setLogin(false);
    history.push("/")
  }


  return (
    <NavWrapper>
      <NavButton to="/">Home </NavButton>
      <NavButton to="/about">About </NavButton>
      <NavButton to="/landmarks/Paris">Places </NavButton>
      {login ? 
      <>
        <NavButton to="/day_planner">Plans </NavButton>
        <NavButton to="/profile">Profile </NavButton>
        <NavButton onClick={logout} to="/">Logout</NavButton>
      </>: 
      <>
        <NavButton to="/login">Login</NavButton>
        <NavButton to="/sign-up">Sign Up</NavButton>
      </>
      }
      
      
    </NavWrapper>
  );
}