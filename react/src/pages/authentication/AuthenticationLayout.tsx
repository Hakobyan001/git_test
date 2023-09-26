import { Outlet } from "react-router-dom";
import AuthWrapper from "../../components/auth/AuthWrapper";

function AuthenticationLayout() {
  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
}

export default AuthenticationLayout;
