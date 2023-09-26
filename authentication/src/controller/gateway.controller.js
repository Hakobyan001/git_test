/* eslint-disable max-len */
// Local Modules
import { SuccessHandlerUtil } from '../utils';

export default class GatewayController {
  static async proxyToExpress(req, res, next) {
    try {
      // const { name } = req.body;
      // console.log(req.body);
      // if (!name) {
      //   throw new Error('o sheet');
      // }
      const user = 'welcome Auction';

      SuccessHandlerUtil.handleTokenVerification(res, next, user);
    } catch (error) {
      next(error);
    }
  }
}
