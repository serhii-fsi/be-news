const db = require('../db/connection');
const ModelError = require('./errors/model-error');


const fetchArticleExistence = async (articleId) => {
    try {
        const { rows } = await db.query(
            `SELECT
                article_id
            FROM articles
            WHERE article_id = $1;`,
            [articleId]
        );
        return rows.length === 1;
    } catch (error) {
        const modelErr = new ModelError({ psql: error, msg: 'PSQL Error' });
        throw modelErr.toAppError();
    }
};


module.exports = fetchArticleExistence;
