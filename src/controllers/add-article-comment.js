const insertComment = require('../models/insert-comment');
const AppError = require('../errors/app-error');


const addArticleComment = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const { username, body } = req.body;

        const comment = await insertComment(article_id, username, body);
        res.status(201).send({ comment });
    } catch (error) {
        next(error);
    }
};


module.exports = addArticleComment;