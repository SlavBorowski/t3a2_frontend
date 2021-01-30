import { Route } from 'react-router-dom'
import { UserForm } from './UserForm'

export function Login() {
  return (
    <>
      <h1>Login</h1>
      <Route component={UserForm} />
    </>
  );
}