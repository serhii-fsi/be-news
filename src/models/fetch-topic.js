const db = require("../db/connection");
const ModelError = require("./errors/model-error");

const fetchTopic = async (topicSlug) => {
    try {
        const { rows } = await db.query(
            `SELECT
                slug, description 
            FROM topics
            WHERE slug = $1;`,
            [topicSlug]
        );
        return rows[0];
    } catch (error) {
        const modelErr = new ModelError({ psql: error, msg: "PSQL Error" });
        throw modelErr.toAppError();
    }
};

module.exports = fetchTopic;
