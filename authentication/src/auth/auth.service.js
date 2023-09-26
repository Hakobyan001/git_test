import jwt from 'jsonwebtoken';
import axios from 'axios';
import { AuthModel } from '../models';
import {
  ErrorsUtil,
  CryptoUtil,
  RegisterVerificationCode
} from '../utils';

import RedisMethods from '../../redis/redis_methods';

import config from '../config/variables.config';
import DateUtils from '../utils/compare-date.util';

const { AUTH, START_AUTH } = config;

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_ACTIVE_TIME
} = AUTH;

const { REGISTER_EXP_TIME, ACTIVATION_EXP_TIME } = START_AUTH;

const {
  InputValidationError, UnauthorizedError, PermissionError, ConflictError
} = ErrorsUtil;

export default class AuthService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET);
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET);

    return { accessToken, refreshToken };
  }

  static generateAccessToken(payload) {
    return {
      accessToken: jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_ACTIVE_TIME })
    };
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

    return {
      accessToken,
      refreshToken,
      ...user
    };
  }

  static async login(username, password) {
    const user = await AuthModel.findByUsernameWithStatus(username);
    if (!user) throw new InputValidationError('Invalid username or password or passive account');
    if (!CryptoUtil.isValidPassword(password, user.password)) {
      throw new InputValidationError('Invalid username or password');
    }

    delete user.password;
    const { accessToken, refreshToken } = AuthService.generateTokens({ ...user });

    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      role: user.role,
      accessToken,
      refreshToken
    };
  }

  static async signUp(email, fullName) {
    try {
      const ifExist = await AuthModel.findByEmail(email);
      if (ifExist) throw ConflictError('User already exist!');

      const activationCode = RegisterVerificationCode.generateActivationCode();
      await AuthService.sendActivationCode({ email, activationCode });
      const payload = {
        email, fullName, registerExpTime: new Date(), activationExpTime: new Date(), activationCode
      };
      await RedisMethods.setData(`auth_${email}`, JSON.stringify(payload));
      const { accessToken } = AuthService.generateAccessToken(payload);
      return accessToken;
    } catch (e) {
      throw new ConflictError(e);
    }
  }

  static async checkActivationCode(payload) {
    try {
      const ifExist = JSON.parse(await RedisMethods.getData(`auth_${payload.email}`));
      if (!ifExist) throw new ConflictError('No such user exists!');
      if (!DateUtils.compareWithCurrentDate(ifExist.activationExpTime, ACTIVATION_EXP_TIME)) {
        throw new ConflictError('You did not have time to enter the activation code!');
      }

      if (payload.activationCode !== ifExist.activationCode) {
        throw new ConflictError('Your verification code is incorrect!');
      }

      payload.fullName = ifExist.fullName;
      const { accessToken } = AuthService.generateAccessToken(payload);
      return accessToken;
    } catch (e) {
      throw new ConflictError(e.message);
    }
  }

  static async createUser(payload) {
    try {
      const ifExist = JSON.parse(await RedisMethods.getData(`auth_${payload.email}`));
      if (!ifExist) throw new ConflictError('No such user exists!');
      if (!DateUtils.compareWithCurrentDate(ifExist.registerExpTime, REGISTER_EXP_TIME)) {
        throw new ConflictError('You did not have time to enter the password!');
      }
      await RedisMethods.deleteData(`auth_${payload.email}`);

      payload.id = btoa(payload.id);
      const { accessToken, refreshToken } = AuthService.generateTokens(payload);
      return { accessToken, refreshToken };
    } catch (e) {
      throw new ConflictError(e.message);
    }
  }

  static async resend(email) {
    try {
      let user = await RedisMethods.getData(`auth_${email}`);
      if (!user) throw new ConflictError('No such user exists!');

      if (!DateUtils.compareWithCurrentDate(user.registerExpTime, REGISTER_EXP_TIME)) {
        await RedisMethods.deleteData(`auth_${email}`);
        throw new ConflictError('You did not have time to enter the password!');
      }

      const activationCode = RegisterVerificationCode.generateActivationCode();
      user = JSON.parse(user);
      user.activationExpTime = new Date();
      user.activationCode = activationCode;
      await RedisMethods.setData(`auth_${email}`, JSON.stringify(user));
      await AuthService.sendActivationCode({ email, activationCode });
      const { accessToken } = AuthService.generateAccessToken(user);
      return accessToken;
    } catch (e) {
      throw new ConflictError(e);
    }
  }

  static sendActivationCode(payload) {
    return axios.post(
      'http://notification:8080/api/v1/notification/sendMail',
      payload
    );
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
    if (!token) { return new UnauthorizedError('1'); }
    const isValidToken = token.split(' ')[1];
    const decodedUser = jwt.verify(isValidToken, process.env.JWT_ACCESS_SECRET);
    if (!decodedUser) {
      return new UnauthorizedError('1');
    }
    return decodedUser;
  }
}
