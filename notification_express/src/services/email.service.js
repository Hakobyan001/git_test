import config from '../config/variables.config';
import { EmailUtil } from '../utils';

export default class EmailService {
  static async sendEmail(user) {
    await EmailUtil.sendMail(config.FROM_EMAIL, user.email, `<h1>Hello ${user.name} ${user.surname}</h1>`, 'All OK!!!');
    console.log(user.name, user.surname, user.email, 'sent email <==============================================================================');
  }
}
