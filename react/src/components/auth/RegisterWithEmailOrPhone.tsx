import { useContext, useEffect, useState } from "react";

import AuthForm from "./AuthForm";
import FormTopLogo from "./AuthTopLogo";
import MediaRegistration from "./MediaRegistration";

import AuthContext from "../../context/auth-context";

const RegisterWithEmailOrPhone = () => {
  const { onNextStep, registrationData } = useContext(AuthContext);
  const [signUpErrors, setSignUpErrors] = useState({});

  const handleAuthFormSubmitAction = (data: object) => {
    onNextStep({ ...registrationData, ...data });
  };

  useEffect(() => {
    // console.log(registrationData);
  }, [registrationData]);

  return (
    <>
      <FormTopLogo>Գրանցում</FormTopLogo>
      <AuthForm
        errors={signUpErrors}
        setErrors={setSignUpErrors}
        byEmail={registrationData.byEmail}
        byPhone={registrationData.byPhone}
        handleFormSubmit={handleAuthFormSubmitAction}
      />
      <MediaRegistration suggestionText="Կամ գրանցվեք" />
    </>
  );
};

export default RegisterWithEmailOrPhone;
