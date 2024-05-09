const db = require("../db/connection");
const format = require("pg-format");
const ModelError = require("./errors/model-error");

const fetchArticles = async (topicSlug) => {
    try {
        const whereSqlExpressions = [];
        if (topicSlug) whereSqlExpressions.push(format("articles.topic = %L", topicSlug));

        const whereSql = whereSqlExpressions.length > 0 ? `WHERE ${whereSqlExpressions.join(" ")}` : "";

        const sql = `
            SELECT
                articles.article_id, articles.author, articles.title, articles.topic, 
                articles.created_at, articles.votes, articles.article_img_url, 
                COUNT(comments.comment_id)::INT AS comment_count
            FROM articles
            LEFT JOIN comments
                ON articles.article_id = comments.article_id
            ${whereSql}
            GROUP BY articles.article_id
            ORDER BY articles.created_at DESC;`;

        const { rows } = await db.query(sql);
        return rows;
    } catch (error) {
        const modelErr = new ModelError({ psql: error, msg: "PSQL Error" });
        throw modelErr.toAppError();
    }
};

module.exports = fetchArticles;
