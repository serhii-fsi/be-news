const db = require("../db/connection");
const ModelError = require("./errors/model-error");

const fetchUsers = async () => {
    try {
        const { rows } = await db.query(
            `SELECT
                username,
                name,
                avatar_url
            FROM
                users;`
        );
        return rows;
    } catch (error) {
        const modelErr = new ModelError({ psql: error, msg: "PSQL Error" });
        throw modelErr.toAppError();
    }
};

module.exports = fetchUsers;
