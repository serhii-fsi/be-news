const request = require('supertest');
const app = require('../../../src/app');
const db = require('../../../src/db/connection');
const seed = require('../../../src/db/seeds/seed');
const testData = require('../../../src/db/data/test-data/index');
const AppError = require('../../../src/errors/app-error');


beforeEach(async () => {
    await seed(testData);
});

afterAll(() => {
    return db.end();
});

describe("GET /api/articles/:article_id", () => {

    test("returns single article when :article_id correct and valid", () => {
        return request(app)
            .get('/api/articles/3')
            .expect(200)
            .then(({ body: { article } }) => {
                expect(article).toMatchObject({
                    article_id: 3,
                    author: 'icellusedkars',
                    title: 'Eight pug gifs that remind me of mitch',
                    body: 'some gifs',
                    topic: 'mitch',
                    created_at: '2020-11-03T09:12:00.000Z',
                    votes: 0,
                    article_img_url:
                        'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
                });
            });
    });

    test("returns status 404 when :article_id incorrect but valid", () => {
        return request(app)
            .get('/api/articles/900')
            .expect(404)
            .then(({ body: { error } }) => {
                const appErr = new AppError({ code: 404, msg: '404 Not Found', log: false });
                expect({ error }).toMatchObject(appErr.exportForClient());
            });
    });

    test("returns status 400 when :article_id is invalid", () => {
        return request(app)
            .get('/api/articles/not_a_digit')
            .expect(400)
            .then(({ body: { error } }) => {
                const appErr = new AppError({ code: 400, msg: '400 Bad Request', log: false });
                expect({ error }).toMatchObject(appErr.exportForClient());
            });
    });

});
