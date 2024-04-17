const endpoints = require('../routes/api-v1/endpoints.json');


const getApi = async (req, res, next) => {
    try {
        res.status(200).send({ endpoints });
    } catch (error) {
        next(error);
    }
};


module.exports = getApi;