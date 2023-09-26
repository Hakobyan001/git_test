// Local Modules
import 'dotenv/config';

const config = {
  PORT: process.env.PORT,
  CORS: process.env.CORS?.split(','),
  IMAGES: process.env.IMAGES,

  PSQL: {
    PG_PORT: process.env.PG_PORT,
    PG_HOST: process.env.PG_HOST,
    PG_USER: process.env.PG_USER,
    PG_DATABASE: process.env.PG_DATABASE,
    PG_USER_PASSWORD: process.env.PG_USER_PASSWORD
  },

  AUTH: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_TOKEN_ACTIVE_TIME: process.env.ACCESS_TOKEN_ACTIVE_TIME,
    REFRESH_TOKEN_ACTIVE_TIME: process.env.REFRESH_TOKEN_ACTIVE_TIME
  },

  TWILIO: {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,
  },

  FROM_EMAIL: process.env.FROM_EMAIL,

  RABBITMQ: {
    NOTIFICATION_QUEUE_NAME: process.env.NOTIFICATION_QUEUE_NAME,
    ACK_TIMEOUT_MS: process.env.ACK_TIMEOUT_MS,
    URL: process.env.URL,
  },

  PATHS: {
    PATH_TO_RESOLUTION: process.env.PATH_TO_RESOLUTION
  },
};

export default config;
