const fetchArticleComments = require("../models/fetch-article-comments");
const fetchArticleExistence = require("../models/fetch-article-existence");
const AppError = require("../errors/app-error");

const getArticleComments = async (req, res, next) => {
    try {
        const { article_id } = req.params;

        const [articleExists, comments] = await Promise.all([
            fetchArticleExistence(article_id),
            fetchArticleComments(article_id),
        ]);

        if (articleExists) {
            res.status(200).send({ comments });
        } else {
            const appErr = new AppError({ code: 404, msg: "404 Not Found" });
            next(appErr);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = getArticleComments;
