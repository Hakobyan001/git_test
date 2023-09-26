import { useContext, JSX } from "react";

import AuthContext from "../../../context/auth-context";
import RegisterPasswordPart from "../../../components/auth/RegisterPasswordPart";
import AuthCodeVerification from "../../../components/auth/AuthCodeVerification";
import RegisterWithEmailOrPhone from "../../../components/auth/RegisterWithEmailOrPhone";

interface ISteps {
  [key: number]: JSX.Element;
}

const STEPS: ISteps = {
  [1]: <RegisterWithEmailOrPhone />,
  [2]: <AuthCodeVerification />,
  [3]: <RegisterPasswordPart />
};

function Register() {
  const { currentStep } = useContext(AuthContext);

  return STEPS[currentStep];
}

export default Register;
