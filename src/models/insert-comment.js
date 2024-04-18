const db = require('../db/connection');
const ModelError = require('./errors/model-error');


const insertComment = async (articleId, username, body) => {
    try {
        const { rows } = await db.query(
            `INSERT INTO comments 
                (body, article_id, author) 
            VALUES ($1, $2, $3) RETURNING *;`,
            [body, articleId, username]
        );
        return rows[0];
    } catch (error) {
        const modelErr = new ModelError({ psql: error, msg: 'PSQL Error' });
        throw modelErr.toAppError();
    }
};


module.exports = insertComment;
