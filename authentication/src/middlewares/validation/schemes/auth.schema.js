// NPM modules
import Joi from 'joi';

const AuthSchema = {
  signUpSchema: {
    body: Joi.object({
      fullName: Joi.string().min(3).required(),
      email: Joi.string().email().required()
    })
  },
  activationCodeSchema: {
    body: Joi.object({
      activationCode: Joi.string().min(4).max(4).required()
    })
  },
  passwordSchema: {
    body: Joi.object({
      password: Joi.string()
          .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
          .required(),
      repeat_password: Joi.ref('password')  // Ensure repeat_password matches password
    }).with('password', 'repeat_password')
  }
};

export default AuthSchema;
