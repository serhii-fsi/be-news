const db = require('../db/connection');
const ModelError = require('./errors/model-error');


const removeComment = async (commentId) => {
    try {
        const { rows } = await db.query(
            `DELETE FROM
                    comments
                WHERE
                    comment_id = $1
                RETURNING
                    comment_id
            ;`,
            [commentId]
        );
        return rows[0];
    } catch (error) {
        const modelErr = new ModelError({ psql: error, msg: 'PSQL Error' });
        throw modelErr.toAppError();
    }
};


module.exports = removeComment;
