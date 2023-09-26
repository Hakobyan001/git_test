import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
  // eslint-disable-next-line no-unused-vars
  onNextStep: (data: any) => {},
  // eslint-disable-next-line no-unused-vars
  onRegistrationDataChange: (data: any) => {},
  currentStep: 1,
  registrationData: {
    byPhone: false,
    byEmail: false
  }
});

export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [registrationData, setRegistrationData] = useState<any>({
    byPhone: false,
    byEmail: true
  });

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const nextStepHandler = (data: any) => {
    setCurrentStep(currentStep + 1);
    handleRegistrationData(data);
  };

  const handleRegistrationData = (data: object) => {
    setRegistrationData({ ...registrationData, ...data });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        currentStep: currentStep,
        onNextStep: nextStepHandler,
        registrationData: registrationData,
        onRegistrationDataChange: handleRegistrationData
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
