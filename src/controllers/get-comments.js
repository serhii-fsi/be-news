const fetchComments = require("../models/fetch-comments");
const fetchArticle = require("../models/fetch-article");
const AppError = require("../errors/app-error");

const getArticleComments = async (req, res, next) => {
    try {
        const { article_id } = req.params;

        const [article, comments] = await Promise.all([fetchArticle(article_id), fetchComments(article_id)]);

        if (article) {
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
