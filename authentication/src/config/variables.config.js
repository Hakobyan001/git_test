require('dotenv').config();

const config = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  PORT: process.env.PORT || 3006,
  ONE_WAY_HASH_SECRET: process.env.ONE_WAY_HASH_SECRET,
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG,
  CORS: process.env.CORS?.split(',') || '*',
  END_DATE: '2053-12-05',
  HOST: process.env.LOCAL_HOST,
  PSQL: {
    PORT: process.env.PSQL_PORT,
    HOST: process.env.PSQL_HOST,
    USER: process.env.PSQL_USER,
    DATABASE: process.env.PSQL_DATABASE,
    PASSWORD: process.env.PSQL_PASSWORD
  },

  AUTH: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_TOKEN_ACTIVE_TIME: process.env.ACCESS_TOKEN_ACTIVE_TIME || '2m',
    REFRESH_TOKEN_ACTIVE_TIME: process.env.REFRESH_TOKEN_ACTIVE_TIME || '1d'
  },

  STORAGE: {
    ROOT_PATH: process.env.ROOT_PATH,
    TMP_PATH: process.env.TMP_PATH,
    IMAGE_PATH: process.env.IMAGE_PATH,
    VIDEO_PATH: process.env.VIDEO_PATH,
    USER_PATH: process.env.USER_PATH
  }
};

export default config;
