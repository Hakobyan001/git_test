import { NavLink } from "react-router-dom";

function Authentication() {
  return (
    <div>
      Authentication Main
      <NavLink to="sign-in">Sign in</NavLink>
      <NavLink to="register">Register</NavLink>
    </div>
  );
}

export default Authentication;
