const fetchArticles = require("../models/fetch-articles");

const getArticles = async (req, res, next) => {
    try {
        const articles = await fetchArticles();
        res.status(200).send({ articles });
    } catch (error) {
        next(error);
    }
};

module.exports = getArticles;
