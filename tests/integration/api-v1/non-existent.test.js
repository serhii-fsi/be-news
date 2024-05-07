const db = require("../../../src/db/connection");
const app = require("../../../src/app");
const request = require("supertest");
const seed = require("../../../src/db/seeds/seed");
const testData = require("../../../src/db/data/test-data/index");
const AppError = require("../../../src/errors/app-error");
const Logger = require("../../../src/loggers/logger");

// Stop logging
Logger.stopLogging();
// Stop logging

beforeEach(() => {
    return seed(testData);
});

afterAll(() => {
    return db.end();
});

describe("GET /api/non-existent", () => {
    test("responds 404 not found", () => {
        return request(app)
            .get("/api/non-existent")
            .expect(404)
            .then(({ body: { error } }) => {
                const appErr = new AppError({ code: 404, msg: "404 Not Found", log: false });
                expect({ error }).toMatchObject(appErr.exportForClient());
            });
    });
});
