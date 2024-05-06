const db = require("../db/connection");
const ModelError = require("./errors/model-error");

const fetchTopics = async () => {
    try {
        const { rows } = await db.query(`SELECT slug, description FROM topics;`);
        return rows;
    } catch (error) {
        const modelErr = new ModelError({ psql: error, msg: "PSQL Error" });
        throw modelErr.toAppError();
    }
};

module.exports = fetchTopics;
