const updateArticle = require('../models/update-article');
const AppError = require('../errors/app-error');


const patchArticle = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const { inc_votes } = req.body;

        const values = {};
        if (inc_votes !== undefined) values.incVotes = inc_votes;

        if (Object.keys(values).length === 0) {
            // Bad request because we don't have anything to update 
            next(new AppError({ code: 400, msg: '400 Bad Request' }));
            return;
        }
        
        const article = await updateArticle(article_id, values);

        if(article === undefined) {
            next(new AppError({ code: 404, msg: '404 Not Found' }));
            return;
        }

        res.status(200).send({ article });
    } catch (error) {
        next(error);
    }
};


module.exports = patchArticle;