import { Route } from 'react-router-dom'
import { UserForm } from './UserForm'

export function Login() {
  return (
    <>
      <h2>Login</h2>
      <Route component={UserForm} />
    </>
  );
}