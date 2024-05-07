const removeComment = require("../models/remove-comment");
const AppError = require("../errors/app-error");

const deleteComment = async (req, res, next) => {
    try {
        const { comment_id } = req.params;

        const comment = await removeComment(comment_id);

        if (comment === undefined) {
            next(new AppError({ code: 404, msg: "404 Not Found" }));
            return;
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = deleteComment;
