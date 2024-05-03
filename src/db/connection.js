const { Pool } = require("pg");

const ENV = process.env.NODE_ENV;

if (ENV !== "production" && ENV !== "development" && ENV !== "test") throw new Error("process.env.NODE_ENV not set");

require("dotenv").config({
    path: `${__dirname}/../../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {};

if (ENV === "production") {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
}

module.exports = new Pool(config);
