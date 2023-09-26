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

  FROM_EMAIL: process.env.FROM_EMAIL
};

export default config;
