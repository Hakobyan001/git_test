import AuthService from './auth.service';
import { SuccessHandlerUtil } from '../utils';

export default class AuthController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const loginResult = await AuthService.login(username, password);
      SuccessHandlerUtil.handleAdd(res, next, loginResult);
    } catch (error) {
      next(error);
    }
  }

  static async signUp(req, res, next) {
    try {
      const { email, fullName } = req.body;
      const accessToken = await AuthService.signUp(email, fullName);
      SuccessHandlerUtil.handleAdd(res, next, { accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async checkActivationCode(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const { activationCode } = req.body;
      const accessToken = await AuthService.checkActivationCode({
        activationCode,
        email: user.email
      });
      SuccessHandlerUtil.handleAdd(res, next, { accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const { password } = req.body;
      const resData = await AuthService.createUser({
        password, email: user.email, fullName: user.fullName
      });
      SuccessHandlerUtil.handleAdd(res, next, resData);
    } catch (error) {
      next(error);
    }
  }

  static async resend(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const resData = await AuthService.resend(user.email);
      SuccessHandlerUtil.handleAdd(res, next, { resData });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const refreshResult = await AuthService.refresh(refreshToken);
      SuccessHandlerUtil.handleAdd(res, next, refreshResult);
    } catch (error) {
      next(error);
    }
  }
}
