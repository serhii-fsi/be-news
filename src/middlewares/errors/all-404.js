const app = require('../../../src/app');


const all404 = (req, res, next) => {
    const resObj = { error: { status: 404, msg: '404 Not Found' } };
    console.log(resObj); // ErrorLogging
    res.status(404).send(resObj);
};


module.exports = all404;