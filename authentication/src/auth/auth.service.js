import jwt from 'jsonwebtoken';
import { AuthModel } from '../models';
import { ErrorsUtil, CryptoUtil } from '../utils';

import config from '../config/variables.config';

const { AUTH } = config;

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET
} = AUTH;

const { InputValidationError, UnauthorizedError, PermissionError } = ErrorsUtil;

export default class AuthService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET);
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET);

    return { accessToken, refreshToken };
  }

  static validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, JWT_ACCESS_SECRET);
    } catch (error) {
      throw new UnauthorizedError(222);
    }
  }

  static async validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      throw new UnauthorizedError();
    }
  }

  static async refresh(token) {
    const user = await AuthService.validateRefreshToken(token);
    const updatedUser = await AuthModel.findByUsername(user.username);
    if (updatedUser.status === 'passive') {
      throw new PermissionError('Passive account');
    }
    const { accessToken, refreshToken } = AuthService.generateTokens(user);

    const payload = {
      accessToken,
      refreshToken,
      ...user
    };
    return payload;
  }

  static async login(username, password) {
    const user = await AuthModel.findByUsernameWithStatus(username);
    if (!user) throw new InputValidationError('Invalid username or password or passive account');
    if (!CryptoUtil.isValidPassword(password, user.password)) {
      throw new InputValidationError('Invalid username or password');
    }

    delete user.password;
    const { accessToken, refreshToken } = AuthService.generateTokens({ ...user });

    const payload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      role: user.role,
      accessToken,
      refreshToken
    };
    return payload;
  }

  static async changePwd(username, password) {
    const user = await AuthModel.findByUsername(username);
    if (!user) throw new InputValidationError('Invalid username or password');
    if (!CryptoUtil.isValidPassword(password, user.password)) {
      throw new InputValidationError('Invalid username or password');
    }

    return true;
  }

  static async isLogin(username, password) {
    const user = await AuthModel.findByUsername(username);
    if (!user) throw new InputValidationError('Invalid username or password');
    if (!CryptoUtil.isValidPassword(password, user.password)) {
      throw new InputValidationError('Invalid username or password');
    }

    return true;
  }

  static async findUser(token) {
    const isLogin = token;
    if (!isLogin) { return new UnauthorizedError('1'); }
    const isValidToken = token.split(' ')[1];
    const decodedUser = jwt.verify(isValidToken, process.env.JWT_ACCESS_SECRET);
    if (!decodedUser) {
      return new UnauthorizedError('1');
    }
    return decodedUser;
  }
}
