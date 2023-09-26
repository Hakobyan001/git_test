// NPM Modules
import amqp from 'amqplib/callback_api';

// Local Modules
import { ErrorsUtil } from '../utils';
import config from '../config/variables.config';
import { video_statuses, video_cut_statuses } from '../enum';
import { CutModel, VideoModel } from '../models';

const { RABBITMQ } = config;
const { ConflictError } = ErrorsUtil;

export default class UserService {

  // static async sendMsg(payload) {
  //   try {
  //     return new Promise(async (resolve, reject) => {
  //       // await VideoModel.getConvertedVideoById(payload.id);
  //
  //       await amqp.connect(RABBITMQ.URL, (error0, connection) => {
  //         if (error0) {
  //           reject(error0);
  //           return;
  //         }
  //         connection.createChannel(async (error1, channel) => {
  //           if (error1) {
  //             reject(error1);
  //             return;
  //           }
  //
  //           const msg = payload;
  //
  //           channel.assertQueue(RABBITMQ.NOTIFICATION_QUEUE_NAME, { durable: true });
  //           channel.sendToQueue(RABBITMQ.NOTIFICATION_QUEUE_NAME, Buffer.from(JSON.stringify(msg)), { persistent: true });
  //
  //           console.log(" [x] Sent '%s'", msg);
  //           resolve(msg);
  //         });
  //       });
  //     });
  //   } catch (error) {
  //     throw new ConflictError(error);
  //   }
  // }
}
