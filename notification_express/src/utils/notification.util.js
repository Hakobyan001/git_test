// // NPM Modules
// import amqp from 'amqplib/callback_api';
//
// // Local Modules
// import config from '../config/variables.config';
// import { ErrorsUtil, LoggerUtil } from '.';
// import { SendNotificationController } from '../controller'
//
// const {
//   RABBITMQ
// } = config;
// const { ConflictError } = ErrorsUtil;
//
// class NotificationUtil {
//   static async sendMsg() {
//     try {
//       amqp.connect(RABBITMQ.URL, (error0, connection) => {
//         if (error0) {
//           throw error0;
//         }
//         connection.createChannel((error1, channel) => {
//           if (error1) {
//             throw error1;
//           }
//           channel.assertQueue(RABBITMQ.NOTIFICATION_QUEUE_NAME, { durable: true });
//           channel.prefetch(1);
//           LoggerUtil.info(`[*] Waiting for messages in test. To exit press CTRL+C`);
//
//           channel.consume(RABBITMQ.NOTIFICATION_QUEUE_NAME, async (msg) => {
//             const obj = JSON.parse(msg.content.toString());
//             const { name, surname, email, status } = obj;
//
//             switch(status) {
//               case 'email':
//                 console.log('byEmail');
//                 await SendNotificationController.byEmail(obj);
//                 break;
//               case 'sms':
//                 console.log('bySms');
//                 await SendNotificationController.byEmail(obj);
//                 break;
//               default:
//                 await SendNotificationController.byEmail(obj);
//             }
//
//             channel.ack(msg);
//           }, { noAck: false });
//         });
//       });
//     } catch (err) {
//       console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Error logged from convert Util >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
//       return new ConflictError(err);
//     }
//   }
// }
//
// export default NotificationUtil;
