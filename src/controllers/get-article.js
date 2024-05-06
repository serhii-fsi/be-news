const fetchArticle = require("../models/fetch-article");
const AppError = require("../errors/app-error");

const getArticle = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const article = await fetchArticle(article_id);
        if (article) res.status(200).send({ article });
        else {
            const appErr = new AppError({ code: 404, msg: "404 Not Found" });
            next(appErr);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = getArticle;
