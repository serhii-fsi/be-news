const db = require('../db/connection');
const ModelError = require('./errors/model-error');


const fetchArticleComments = async (articleId) => {
    try {
        const { rows } = await db.query(
            `SELECT
                comment_id, votes, created_at, author, body, article_id
            FROM comments
            WHERE article_id = $1
            ORDER BY created_at DESC;`,
            [articleId]
        );
        return rows;
    } catch (error) {
        const modelErr = new ModelError({ psql: error, msg: 'PSQL Error' });
        throw modelErr.toAppError();
    }
};


module.exports = fetchArticleComments;
