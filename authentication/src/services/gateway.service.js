/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-var */
/* eslint-disable block-scoped-var */
import { ErrorsUtil } from '../utils';

const axios = require('axios');

const { ConflictError } = ErrorsUtil;

export default class GatewayService {
  static async getName(user) {
    try {
      const response = await axios.post('http://product:2000/api/v1/test', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = response.data;
      return result;
    } catch (error) {
      throw new ConflictError(error?.message);
    }
  }
}
