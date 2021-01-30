import { Route } from 'react-router-dom'
import { UserForm } from './UserForm'

export function SignUp(props) {

  return (
    <>
      <h1>Sign Up</h1>
      <Route component={UserForm} />
    </>
  );
}