const fetchTopics = require("../models/fetch-topics");

const getTopics = async (req, res, next) => {
    try {
        const topics = await fetchTopics();
        res.status(200).send({ topics });
    } catch (error) {
        next(error);
    }
};

module.exports = getTopics;
