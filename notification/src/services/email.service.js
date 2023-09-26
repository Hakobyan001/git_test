import config from '../config/variables.config';
import { EmailUtil } from '../utils';

export default class EmailService {
  static async sendEmail(email, activationCode) {
     return EmailUtil.sendMail(
      config.FROM_EMAIL, email,
      `<h1>Here is your one-time verification code -  
                <span style="color: #00C889">${ activationCode }</span>
              </h1>`,
      'Your verification code'
    );
  }
}
