// NPM Modules
import amqp from 'amqplib/callback_api';

// Local Modules
import config from '../config/variables.config';
import { ErrorsUtil, LoggerUtil } from '../utils';
import { EmailService, SMSService } from '../services';
import { NotificationMethodsEnum } from '../enum';

const {
  RABBITMQ
} = config;
const { ConflictError } = ErrorsUtil;

class NotificationController {
  static async sendNotification() {
    try {
      amqp.connect(RABBITMQ.URL, (error0, connection) => {
        if (error0) {
          throw error0;
        }
        connection.createChannel((error1, channel) => {
          if (error1) {
            throw error1;
          }
          channel.assertQueue(RABBITMQ.NOTIFICATION_QUEUE_NAME, { durable: true });
          channel.prefetch(1);
          LoggerUtil.info('[*] Waiting for messages in test. To exit press CTRL+C');

          channel.consume(RABBITMQ.NOTIFICATION_QUEUE_NAME, async (msg) => {
            const obj = JSON.parse(msg.content.toString());

            const services = {
              EmailService,
              SMSService
            };

            if (Object.keys(NotificationMethodsEnum).indexOf(obj.status) !== -1) {
              console.log('Selected');
              await services[NotificationMethodsEnum[obj.status].serviceName][NotificationMethodsEnum[obj.status].methodName](obj);
            } else {
              console.log('Default');
              obj.status = 'email';
              await services[NotificationMethodsEnum[obj.status].serviceName][NotificationMethodsEnum[obj.status].methodName](obj);
            }

            channel.ack(msg);
          }, { noAck: false });
        });
      });
    } catch (err) {
      console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Error logged from convert Util >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      return new ConflictError(err);
    }
  }
}

export default NotificationController;
