// NPM Modules
import express from 'express';

// Local Modules
import user from './user.api';

const app = express();

// API
app.use('/', user);

export default app;
