import { useContext, useState } from "react";
import AuthForm from "../../../components/auth/AuthForm";
import AuthTopLogo from "../../../components/auth/AuthTopLogo";
import MediaRegistration from "../../../components/auth/MediaRegistration";
import AuthContext from "../../../context/auth-context";
import validateUtil from "../../../utils/validator.util";
import { signInSchema } from "../../../schemas/auth.schema";
import { AuthType } from "../../../types/auth.types";

function SignIn() {
  const { registrationData } = useContext(AuthContext);
  const [signInErrors, setSignInErrors] = useState<object>({});

  const handleSignIn = async (data: AuthType) => {
    const { isValid, errors } = await validateUtil(data, signInSchema);

    setSignInErrors(errors);

    if (!isValid) return;

    // api logics
  };

  return (
    <div>
      <AuthTopLogo>Մուտք</AuthTopLogo>
      <AuthForm
        byEmail={registrationData.byEmail}
        byPhone={registrationData.byPhone}
        errors={signInErrors}
        setErrors={setSignInErrors}
        handleFormSubmit={handleSignIn}
      />
      <MediaRegistration suggestionText="Կամ մուտք գործեք" />
    </div>
  );
}

export default SignIn;
