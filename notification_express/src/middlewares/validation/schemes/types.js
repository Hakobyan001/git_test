// NPM Modules
import Joi from 'joi';

const number = Joi.number();
const positiveNumber = Joi.number().greater(0);
const ID = positiveNumber.integer();
const arrayID = Joi.array().items(ID);
const paramID = Joi.object({ id: ID.required() }).min(1).required();
const numberPrecision = Joi.number().precision(2).required();

const Types = {
  ID, arrayID, paramID, positiveNumber, number, numberPrecision
};
export default Types;
