import { useContext, useEffect, useState } from "react";

import constants from "./constants";

import Button from "../../components/shared/Button";
import authContext from "../../context/auth-context";
import FormTopLogo from "../../components/auth/AuthTopLogo";
import VerificationInput from "../../components/auth/VerificationInput";
import Timer from "../shared/Timer";

const { TEXT_BASE_CLASSES, RESEND_BUTTON_CLASSES, RESEND_CODE_TIMER_DURATION } = constants;

const CodeVerification = () => {
  const { registrationData } = useContext(authContext);
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(RESEND_CODE_TIMER_DURATION);
  const [verificationError, setVerificationError] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (duration > 0) {
        setDuration(duration - 1);
      } else {
        setShowTimer(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const handleTimerChange = () => {
    if (duration > 0) {
      setDuration(duration - 1);
    } else {
      setShowTimer(false);
    }
  };

  const handleResendClick = () => {
    setShowTimer(true);
    setDuration(RESEND_CODE_TIMER_DURATION);
  };

  const checkVerificationCode = (value: string) => {
    console.log(value);
    // Send the value to the backend for verification
    // Example error message:
    setVerificationError("Մուտքագրված կոդը այլևս վավեր չէ։ Անհրաժե՞շտ է վերաուղարկել նոր կոդ");
  };
  return (
    <>
      <FormTopLogo>
        Հաստատեք Ձեր {registrationData.byPhone ? "հեռախոսահամարը" : "էլ.հասցեն"}
      </FormTopLogo>
      <div className={`${TEXT_BASE_CLASSES} mt-[80px] mb-[60px]`}>
        Մեկանգամյա հաստատման կոդը ուղարկվել է
        <span className={"font-semibold"}> vsaratikyan@gmail.com </span> էլ. հասցեին (
        <span className={"font-semibold text-[#1376DD] cursor-pointer"}>Փոփոխել</span>)
      </div>
      <VerificationInput handleCodeCheck={checkVerificationCode} error={verificationError} />
      {showTimer ? (
        <div className={`mt-[60px]`}>
          <div className={`${TEXT_BASE_CLASSES}`}>
            Կոդը հնարավոր կլինի վերաուղարկել
            <Timer
              duration={duration}
              handleTimerChange={handleTimerChange}
              className={"text-[#F4B405] text-[20px] font-semibold"}
            />
            վայրկյանից
          </div>
        </div>
      ) : (
        <Button hover active className={RESEND_BUTTON_CLASSES} onClick={handleResendClick}>
          Վերաուղարկել հաստատման կոդը
        </Button>
      )}
    </>
  );
};

export default CodeVerification;
