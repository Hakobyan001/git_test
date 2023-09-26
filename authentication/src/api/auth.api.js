// NPM Modules
import express from 'express';

import AuthController from '../auth/auth.controller';
import { AuthValidationMiddleware } from '../middlewares/validation';
import AuthMiddlaware from '../auth/auth.middleware';

const router = express.Router();

// Step 1 for auth
router.post('/signUp',
  AuthValidationMiddleware.validateSignUpArgs,
  AuthController.signUp);

// Step 2 for auth
router.post('/activationCode',
  AuthMiddlaware.authenticate(),
  AuthValidationMiddleware.validateActivationCodeArgs,
  AuthController.checkActivationCode);

// Step 3 for auth
router.post('/createUser',
  AuthMiddlaware.authenticate(),
  AuthValidationMiddleware.validatePasswordArgs,
  AuthController.createUser);

router.post('/resend',
  AuthMiddlaware.authenticate(),
  AuthController.resend);

router.post('/login',
  AuthValidationMiddleware.validateLoginArgs,
  AuthController.login);

router.post('/refresh',
  AuthController.refresh);

export default router;
