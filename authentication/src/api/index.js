import express from 'express';
// import gateway from './gateway.api';
import auth from './auth.api';

const app = express();

app.use('/auth', auth);
// app.use('/gateway', gateway);

export default app;
