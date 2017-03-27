'use strict';

const env = {
  PORT: process.env.PORT || 3000,
  //DATABASE_URL: process.env.DATABASE_URL || 'jdbc:postgresql://localhost:5432/db_casadecarnes',
  DATABASE_NAME: process.env.DATABASE_NAME || 'asteriskcdrdb',
  DATABASE_HOST: process.env.DATABASE_HOST || '192.168.4.220',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'gustavo',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'lisko@@2016',
  DATABASE_PORT: process.env.DATABASE_PORT || 3306,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'mysql',

  NODE_ENV: process.env.NODE_ENV || 'development',
};

module.exports = env;
