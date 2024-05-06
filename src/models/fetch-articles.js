const db = require("../db/connection");
const ModelError = require("./errors/model-error");

const fetchArticles = async () => {
    try {
        const { rows } = await db.query(
            `SELECT
                articles.article_id, articles.author, articles.title, articles.topic, 
                articles.created_at, articles.votes, articles.article_img_url, 
                COUNT(comments.comment_id)::INT AS comment_count
            FROM articles
            LEFT JOIN comments
                ON articles.article_id = comments.article_id
            GROUP BY articles.article_id
            ORDER BY articles.created_at DESC;`
        );
        return rows;
    } catch (error) {
        const modelErr = new ModelError({ psql: error, msg: "PSQL Error" });
        throw modelErr.toAppError();
    }
};

module.exports = fetchArticles;
