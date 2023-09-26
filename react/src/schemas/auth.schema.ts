import * as yup from "yup";
import { MESSAGE_REQUIRED } from "./constants/schema.constants";

export const signInSchema = yup.object().shape({
  password: yup.string().required(MESSAGE_REQUIRED.password),
  user_name: yup.string().required(MESSAGE_REQUIRED.user_name)
});
