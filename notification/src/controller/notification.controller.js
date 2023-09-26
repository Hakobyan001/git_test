// Local Modules
import { EmailService } from '../services';
import { SuccessHandlerUtil } from '../utils';

class NotificationController {
  static async sendMail(req, res, next) {
    try {
      const { email, activationCode } = req.body;
      await EmailService.sendEmail(email, activationCode);
      SuccessHandlerUtil.handleAdd(res, next, { success: true });
    } catch (err) {
      next(err);
    }
  }
}

export default NotificationController;
