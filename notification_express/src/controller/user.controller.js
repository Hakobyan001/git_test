// NPM Modules
import fs from 'fs';

// Local Modules
import { ErrorsUtil, SuccessHandlerUtil } from '../utils';
import { UserService } from '../services';

const { ConflictError } = ErrorsUtil;

export default class UserController {
  static async sendMsg(req, res, next) {
    try {
      console.log(req.body, "bodyyy");
      const user = "Notification Hello"
      SuccessHandlerUtil.handleGet(res, next, user);
    } catch (error) {
      next(error);
    }
  }
}
