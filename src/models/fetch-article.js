const db = require("../db/connection");
const ModelError = require("./errors/model-error");

const fetchArticle = async (articleId) => {
    try {
        const { rows } = await db.query(
            `SELECT
                article_id, author, title, body, topic, created_at, votes, article_img_url
            FROM articles
            WHERE article_id = $1;`,
            [articleId]
        );
        return rows[0];
    } catch (error) {
        const modelErr = new ModelError({ psql: error, msg: "PSQL Error" });
        throw modelErr.toAppError();
    }
};

module.exports = fetchArticle;
