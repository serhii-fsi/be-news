const seed = require('./seed.js');
const db = require('../connection.js');
const testData = require('../data/test-data/index.js');
const devData = require('../data/development-data/index.js');

const runSeed = () => {
  const ENV = process.env.NODE_ENV;
  if (ENV === 'development' || ENV === 'production')
    return seed(devData).then(() => db.end());
  else if (ENV === 'test')
    return seed(testData).then(() => db.end());
  else
    throw new Error('process.env.NODE_ENV not set');
};

runSeed();
