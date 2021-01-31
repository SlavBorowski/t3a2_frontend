import { Route } from 'react-router-dom'
import { UserForm } from './UserForm'

export function SignUp() {

  return (
    <>
      <h2>Sign Up</h2>
      <Route component={UserForm} />
    </>
  );
}