import Joi from 'joi';

export const positiveNumber = Joi.number().min(1);
export const ID = positiveNumber.integer();
