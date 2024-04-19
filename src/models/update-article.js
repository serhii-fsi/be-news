const db = require('../db/connection');
const ModelError = require('./errors/model-error');


const updateArticle = async (articleId, values) => {
    try {
        const { rows } = await db.query(
            `UPDATE articles
                SET
                    votes = votes + $2 
                WHERE
                    article_id = $1
                RETURNING
                    article_id, 
                    title,
                    body,
                    topic,
                    created_at,
                    votes,
                    article_img_url
            ;`,
            [articleId, values.incVotes]
        );
        return rows[0];
    } catch (error) {
        const modelErr = new ModelError({ psql: error, msg: 'PSQL Error' });
        throw modelErr.toAppError();
    }
};


module.exports = updateArticle;
