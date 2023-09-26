export interface IPasswordValidationResult {
  hasNumber: boolean;
  isValidLength: boolean;
  hasUpperCaseLetter: boolean;
  hasLowerCaseLetter: boolean;
}
export interface IDebauncedResult {
  debaunced: boolean;
  isTheSame: boolean;
  repDebaunced: boolean;
  validationResult: IPasswordValidationResult;
}
export interface IAuthSignIn {
  user_name: string;
  password: string;
}
export interface IAuthSignUp {
  email?: string;
  phone?: string;
  full_name?: string;
}
