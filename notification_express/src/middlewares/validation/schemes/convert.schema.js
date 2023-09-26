// NPM Modules
import Joi from 'joi';

// Local Modules
import Types from './types';

const { ID, numberPrecision } = Types;

const ConvertSchema = {
  convertSchema: {
    body: Joi.object({
      source: Joi.string().min(1).required(),
      uname: Joi.string().min(1).required(),
      id: ID.required()
    })
  },

  cutSchema: {
    body: Joi.object({
      id: ID.required(),
      start: numberPrecision,
      end: numberPrecision,
      resolution: Joi.string().valid('1920x1080', '1280x720', '640x480')
    })
  }
};

export default ConvertSchema;
