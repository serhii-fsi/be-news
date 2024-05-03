const insertComment = require("../models/insert-comment");
const checkByGreenList = require("../utils/check-by-green-list");
const AppError = require("../errors/app-error");

const greenListConfig = { username: true, body: true };

const postComment = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const { username, body } = req.body;

        if (!checkByGreenList(req.body, greenListConfig)) {
            // Could be an attack
            next(new AppError({ code: 400, msg: "400 Bad Request" }));
            return;
        }

        const comment = await insertComment(article_id, username, body);
        res.status(201).send({ comment });
    } catch (error) {
        next(error);
    }
};

module.exports = postComment;
