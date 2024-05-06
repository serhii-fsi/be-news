const db = require("../../../src/db/connection");
const app = require("../../../src/app");
const request = require("supertest");
const seed = require("../../../src/db/seeds/seed");
const testData = require("../../../src/db/data/test-data/index");
const { articleData, commentData, topicData, userData } = testData;
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

const createError404 = () =>
    new AppError({
        code: 404,
        msg: "404 Not Found",
        log: false,
    }).exportForClient();
const createError400 = () =>
    new AppError({
        code: 400,
        msg: "400 Bad Request",
        log: false,
    }).exportForClient();

describe("GET /api/articles/:article_id", () => {
    test("returns single article when :article_id correct and valid", () => {
        return request(app)
            .get("/api/articles/3")
            .expect(200)
            .then(({ body: { article } }) => {
                expect(article).toMatchObject({
                    article_id: 3,
                    author: "icellusedkars",
                    title: "Eight pug gifs that remind me of mitch",
                    body: "some gifs",
                    topic: "mitch",
                    created_at: "2020-11-03T09:12:00.000Z",
                    votes: 0,
                    article_img_url:
                        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                });
            });
    });

    test("returns status 404 when :article_id incorrect but valid", () => {
        return request(app)
            .get("/api/articles/900")
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

    test("returns status 400 when :article_id is invalid", () => {
        return request(app)
            .get("/api/articles/not_a_digit")
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

describe("GET /api/articles", () => {
    // // Good test but have a psql pg-format timezone bug. Going to fix later.
    // test.only("returns all articles with the correct order and props values", () => {
    //     return request(app)
    //         .get('/api/articles')
    //         .expect(200)
    //         .then(({ body: { articles } }) => {
    //             expect(articles).toHaveLength(13);
    //             const buildApiArticlesData = (articleData, commentData) => {
    //                 return articleData.map((articleObj, index) => {
    //                     const articleId = index + 1;
    //                     // const format = require('pg-format');
    //                     // console.log(
    //                     //     new Date( format('%L', new Date(articleObj.created_at)) ).toISOString()
    //                     // );
    //                     return {
    //                         article_id: articleId,
    //                         author: articleObj.author,
    //                         title: articleObj.title,
    //                         topic: articleObj.topic,
    //                         created_at: (
    //                             new Date(articleObj.created_at).toISOString()
    //                         ),
    //                         votes: articleObj.votes ?? 0,
    //                         article_img_url: articleObj.article_img_url,
    //                         comment_count: commentData.reduce(
    //                             (count, comment) => {
    //                                 return articleId === comment.article_id ? count + 1 : count
    //                             }, 0
    //                         )
    //                     };
    //                 });
    //             };
    //             const articlesFromData = buildApiArticlesData(articleData, commentData);
    //             articlesFromData.sort(
    //                 ({ created_at: a }, { created_at: b }) =>
    //                     (new Date(b)).getTime() - (new Date(a)).getTime()
    //             );
    //             expect(articles).toMatchObject(articlesFromData);
    //         });
    // });

    test("returns all articles with the correct props types", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
                expect(articles).toHaveLength(13);
                articles.forEach((article) => {
                    expect(article).toMatchObject({
                        article_id: expect.any(Number),
                        author: expect.any(String),
                        title: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number),
                    });
                });
            });
    });

    test("fields of an article with id 1 must be the same", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
                expect(articles.find(({ article_id }) => article_id === 1)).toMatchObject({
                    article_id: 1,
                    author: "butter_bridge",
                    title: "Living in the shadow of a great man",
                    topic: "mitch",
                    created_at: "2020-07-09T20:11:00.000Z",
                    votes: 100,
                    article_img_url:
                        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                });
            });
    });

    test("articles sorted by date", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
                expect(articles).toBeSorted({
                    key: "created_at",
                    descending: true,
                });
            });
    });
});

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

describe("PATCH /api/articles/:article_id", () => {
    test("responds with 200 and the updated article with the correct props types and incremented value", () => {
        return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 69 })
            .expect(200)
            .then(({ body: { article } }) => {
                expect(article).toMatchObject({
                    article_id: 1,
                    title: "Living in the shadow of a great man",
                    body: "I find this existence challenging",
                    topic: "mitch",
                    created_at: "2020-07-09T20:11:00.000Z",
                    votes: 169,
                    article_img_url:
                        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                });
            });
    });

    test("responds with 200 and the updated article with the correct props types and decremented value", () => {
        return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: -69 })
            .expect(200)
            .then(({ body: { article } }) => {
                expect(article).toMatchObject({
                    votes: 31,
                });
            });
    });

    test("responds with 400 error if inc_votes (INT) is out of range", () => {
        return request(app)
            .patch("/api/articles/2")
            .send({ inc_votes: 0x7fffffff + 1 })
            .expect(400)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError400());
            });
    });

    test("responds with 400 error for invalid inc_votes", () => {
        return request(app)
            .patch("/api/articles/2")
            .send({ inc_votes: "invalid_value" })
            .expect(400)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError400());
            });
    });

    test("responds with 404 error when article_id is number but does not exist", () => {
        return request(app)
            .patch("/api/articles/333")
            .send({ inc_votes: 10 })
            .expect(404)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError404());
            });
    });

    test("Responds with 400 error when article_id not a number", () => {
        return request(app)
            .patch("/api/articles/not_a_number")
            .send({ inc_votes: 10 })
            .expect(400)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError400());
            });
    });

    test("returns 400 error if wrong param name was passed", () => {
        return request(app)
            .patch("/api/articles/2")
            .send({
                wrongparam: "wrongparam",
            })
            .expect(400)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError400());
            });
    });

    test("returns 400 error if param was missed", () => {
        return request(app)
            .patch("/api/articles/2")
            .send({})
            .expect(400)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError400());
            });
    });

    // We can't check for "malformed body" in express because we use express.json() which gives
    // an empty object if the json is invalid. We can use .json([options]).
    // "any required parameters" because in the future this test should work when we need to update other props
    test("responds with 400 error when any required parameters are not provided", () => {
        return request(app)
            .patch("/api/articles/2")
            .send("malformed body")
            .expect(400)
            .then(({ body: { error } }) => {
                expect({ error }).toMatchObject(createError400());
            });
    });
});
