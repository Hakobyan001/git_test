import { AuthSchemes } from './schemes';
import ValidatorUtil from './util/validator.util';

class AuthValidation {
  static validateSignUpArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.signUpSchema, next);
  }

  static validateActivationCodeArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.activationCodeSchema, next);
  }

  static validatePasswordArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.passwordSchema, next);
  }

  static validateLoginArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AuthSchemes.signUpSchema, next);
  }
}

export default AuthValidation;
