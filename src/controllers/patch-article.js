const updateArticle = require("../models/update-article");
const checkByGreenList = require("../utils/check-by-green-list");
const AppError = require("../errors/app-error");

const greenListConfig = { inc_votes: true };

const patchArticle = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const { inc_votes } = req.body;

        if (!checkByGreenList(req.body, greenListConfig)) {
            // Could be an attack
            next(new AppError({ code: 400, msg: "400 Bad Request" }));
            return;
        }

        const article = await updateArticle(article_id, inc_votes);

        if (article === undefined) {
            next(new AppError({ code: 404, msg: "404 Not Found" }));
            return;
        }

        res.status(200).send({ article });
    } catch (error) {
        next(error);
    }
};

module.exports = patchArticle;
