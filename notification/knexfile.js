import config from './src/config/variables.config';

const { PSQL } = config;

const {
  PG_PORT, PG_HOST, PG_DATABASE, PG_USER, PG_USER_PASSWORD
} = PSQL;

export default {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    seeds: { directory: 'seeds/dev' },
    connection: {
      port: PG_PORT,
      host: PG_HOST,
      database: PG_DATABASE,
      user: PG_USER,
      password: PG_USER_PASSWORD
    }
  },

  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      port: PG_PORT,
      host: PG_HOST,
      database: PG_DATABASE,
      user: PG_USER,
      password: PG_USER_PASSWORD
    }
  }
};
