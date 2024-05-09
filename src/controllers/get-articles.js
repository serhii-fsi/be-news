const fetchArticles = require("../models/fetch-articles");
const fetchTopic = require("../models/fetch-topic");
const checkByGreenList = require("../utils/check-by-green-list");
const AppError = require("../errors/app-error");

const greenListConfig = { topic: true };

const getArticles = async (req, res, next) => {
    try {
        if (!checkByGreenList(req.query, greenListConfig)) {
            // Could be an attack
            next(new AppError({ code: 400, msg: "400 Bad Request" }));
            return;
        }

        const { topic: topicSlug } = req.query;

        const [topic, articles] = await Promise.all([
            topicSlug ? fetchTopic(topicSlug) : Promise.resolve(false),
            fetchArticles(topicSlug)
        ]);

        if (topicSlug && !topic) {
            const appErr = new AppError({ code: 404, msg: "404 Topic Not Found" });
            next(appErr);
        }

        res.status(200).send({ articles });
    } catch (error) {
        next(error);
    }
};

module.exports = getArticles;
