// NPM Modules
import { Twilio } from 'twilio';

// Local Modules
import config from '../config/variables.config';

const client = new Twilio(config.TWILIO.TWILIO_ACCOUNT_SID, config.TWILIO.TWILIO_AUTH_TOKEN, { lazyLoading: true });

class TwilioUtil {
  static async twilioSendOTP(phoneNumber) {
    console.log(`phoneNumber - ${phoneNumber}`);
    try {
      return client.verify.v2
        .services(config.TWILIO.TWILIO_SERVICE_SID)
        .verifications.create({
          to: `${phoneNumber}`,
          channel: 'sms',
        });
    } catch (e) {
      return e;
    }
  }
}

export default TwilioUtil;
