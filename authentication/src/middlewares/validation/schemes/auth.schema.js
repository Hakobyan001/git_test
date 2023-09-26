// NPM modules
import Joi from 'joi';

const AuthSchema = {
  loginSchema: {
    body: Joi.object({
      password: Joi.string().min(2).required(),
      username: Joi.string().min(2).required()
    })
  }
};

export default AuthSchema;
