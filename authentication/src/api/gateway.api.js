// NPM Modules
import express from 'express';

// Local Modules
import { GatewayController } from '../controller';

const router = express.Router();

router.post(
  '/',
  GatewayController.proxyToExpress
);

export default router;
