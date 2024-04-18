const { Pool } = require('pg');

const ENV = process.env.NODE_ENV;

if (ENV !== 'development' && ENV !== 'test')
  throw new Error('process.env.NODE_ENV not set');

require('dotenv').config({
  path: `${__dirname}/../../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
  throw new Error('process.env.PGDATABASE not set');
}

module.exports = new Pool();