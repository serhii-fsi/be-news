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

const createError404 = () => new AppError({ code: 404, msg: "404 Not Found", log: false }).exportForClient();
const createError400 = () => new AppError({ code: 400, msg: "400 Bad Request", log: false }).exportForClient();

describe("GET /api/articles/:article_id/comments", () => {
    test("returns all comments for the 1st article with the correct prop types", () => {
        return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body: { comments } }) => {
                expect(comments).toHaveLength(11);
                comments.forEach((comment) => {
                    expect(comment).toMatchObject({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: expect.any(Number),
                    });
                });
            });
    });

    test("comments are served with the most recent comments first", () => {
        return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body: { comments } }) => {
                expect(comments).toBeSorted({
                    key: "created_at",
                    descending: true,
                });
            });
    });

    test("second comment has the same props as in test data", () => {
        return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body: { comments } }) => {
                expect(comments.find(({ comment_id }) => comment_id === 2)).toMatchObject({
                    comment_id: 2,
                    votes: 14,
                    created_at: "2020-10-31T03:03:00.000Z",
                    author: "butter_bridge",
                    body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
                    article_id: 1,
                });
            });
    });

    test("returns an empty array for the 2nd article which doesn't have comments", () => {
        return request(app)
            .get("/api/articles/2/comments")
            .expect(200)
            .then(({ body: { comments } }) => {
                expect(comments).toEqual([]);
            });
    });

    test("returns 404 error for incorrect but valid :article_id", () => {
        return request(app)
            .get("/api/articles/333/comments")
            .expect(404)
            .then(({ body: { error } }) => {
                const appErr = new AppError({
                    code: 404,
                    msg: "404 Not Found",
                    log: false,
                });
                expect({ error }).toMatchObject(appErr.exportForClient());
            });
    });

    test("returns 400 error for invalid :article_id", () => {
        return request(app)
            .get("/api/articles/invalid_article_id/comments")
            .expect(400)
            .then(({ body: { error } }) => {
                const appErr = new AppError({
                    code: 400,
                    msg: "400 Bad Request",
                    log: false,
                });
                expect({ error }).toMatchObject(appErr.exportForClient());
            });
    });
});

describe("POST /api/articles/:article_id/comments", () => {
    test("returns the posted comment with the correct props types and values", () => {
        return request(app)
            .post("/api/articles/3/comments")
            .send({
                username: "butter_bridge",
                body: "In coding, simplicity is the ultimate sophistication.",
            })
            .expect(201)
            .then(({ body: { comment } }) => {
                expect(comment).toMatchObject({
                    comment_id: 19,
                    votes: 0,
                    created_at: expect.any(String),
                    author: "butter_bridge",
                    body: "In coding, simplicity is the ultimate sophistication.",
                    article_id: 3,
                });
            });
    });

    test("returns 404 error when article_id is number but does not exist", () => {
        return request(app)
            .post("/api/articles/333/comments")
            .send({
                username: "butter_bridge",
                body: "In coding, simplicity is the ultimate sophistication.",
            })
            .expect(404)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError404());
            });
    });

    test("returns 400 error when article_id not a number", () => {
        return request(app)
            .post("/api/articles/not_a_number/comments")
            .send({
                username: "butter_bridge",
                body: "In coding, simplicity is the ultimate sophistication.",
            })
            .expect(400)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError400());
            });
    });

    test("returns 404 error for username which does not exist", () => {
        return request(app)
            .post("/api/articles/3/comments")
            .send({
                username: "wrong_username",
                body: "In coding, simplicity is the ultimate sophistication.",
            })
            .expect(404)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError404());
            });
    });

    test("returns 400 error if wrong param name was passed", () => {
        return request(app)
            .post("/api/articles/3/comments")
            .send({
                wrongparam: "wrongparam",
                username: "butter_bridge",
                body: "In coding, simplicity is the ultimate sophistication.",
            })
            .expect(400)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError400());
            });
    });

    test("returns 400 error if param was missed", () => {
        return request(app)
            .post("/api/articles/3/comments")
            .send({
                username: "butter_bridge",
            })
            .expect(400)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError400());
            });
    });
});

describe("DELETE /api/comments/:comment_id", () => {
    test("responds with 204 status and no content if deleting was successful", () => {
        return request(app)
            .delete("/api/comments/1")
            .expect(204)
            .then(({ body }) => {
                expect(body).toEqual({});
            })
            .then(() => {
                // Checking that we do not have this resource immediately after deletion
                return request(app)
                    .delete("/api/comments/1")
                    .expect(404)
                    .then(({ body: { error } }) => {
                        expect({ error }).toMatchObject(createError404());
                    });
            });
    });

    test("responds with 404 error when comment_id is number but does not exist", () => {
        return request(app)
            .delete("/api/comments/333")
            .expect(404)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError404());
            });
    });

    test("responds with 400 error if comment_id (INT) is out of range", () => {
        return request(app)
            .delete("/api/comments/" + (0x7fffffff + 1))
            .expect(400)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError400());
            });
    });

    test("responds with 400 error when comment_id not a number", () => {
        return request(app)
            .delete("/api/comments/not_a_number")
            .expect(400)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError400());
            });
    });
});
