// NPM Modules
import express from 'express';

import UserController from '../controller/user.controller';

const router = express.Router();

router.post('/',
    UserController.sendMsg);

export default router;
