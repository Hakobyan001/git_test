import { TwilioUtil } from '../utils';

export default class SMSService {
  static async sendSMS(user) {
    try {
      await TwilioUtil.twilioSendOTP(user.phone_number);
    } catch (e) {
      throw new Error("SMS isn't sent!");
    }
  }
}
